import { NextResponse } from 'next/server';
import { getDbConnection } from '@/lib/db';
import { protect } from '@/lib/auth';
import { stkPush } from '@/lib/services/daraja';

// POST Create new order and initiate M-Pesa payment
export async function POST(req) {
    const auth = await protect(req);
    if (auth.error) {
        return NextResponse.json({ message: auth.error }, { status: auth.status });
    }

    try {
        const { shop_id, items, total_amount, delivery_address, phone } = await req.json();
        const db = getDbConnection();

        // 1. Insert Order into MySQL
        const [result] = await db.execute(
            'INSERT INTO orders (buyer_id, shop_id, items, total_amount, delivery_address, status, payment_status) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [
                auth.user.id,
                shop_id,
                JSON.stringify(items),
                total_amount,
                delivery_address,
                'pending',
                'unpaid'
            ]
        );

        const orderId = result.insertId;

        // 2. Initiate M-Pesa STK Push
        // Ensure phone is in format 2547XXXXXXXX
        let formattedPhone = phone.replace('+', '');
        if (formattedPhone.startsWith('0')) formattedPhone = '254' + formattedPhone.slice(1);

        const mpesaResponse = await stkPush(formattedPhone, total_amount, orderId);

        // 3. Log initial payment request
        await db.execute(
            'INSERT INTO payments (order_id, user_id, amount, mpesa_checkout_id, status) VALUES (?, ?, ?, ?, ?)',
            [orderId, auth.user.id, total_amount, mpesaResponse.CheckoutRequestID, 'pending']
        );

        return NextResponse.json({
            message: 'Order placed, please complete payment on your phone',
            orderId,
            checkoutRequestId: mpesaResponse.CheckoutRequestID
        }, { status: 201 });

    } catch (err) {
        console.error('Order creation error:', err);
        return NextResponse.json({ error: 'Failed to create order or initiate payment' }, { status: 500 });
    }
}
