import { NextResponse } from 'next/server';
import { getDbConnection } from '@/lib/db';
import { sendOrderConfirmation } from '@/lib/services/sms';

// POST M-Pesa CallBack (Public Webhook)
export async function POST(req) {
    try {
        const body = await req.json();
        console.log('M-Pesa Callback Received:', JSON.stringify(body));

        const { Body: { stkCallback } } = body;
        const { ResultCode, ResultDesc, CheckoutRequestID, CallbackMetadata } = stkCallback;

        const db = getDbConnection();

        if (ResultCode === 0) {
            // Payment Successful
            const items = CallbackMetadata.Item;
            const amount = items.find(i => i.Name === 'Amount').Value;
            const receipt = items.find(i => i.Name === 'MpesaReceiptNumber').Value;
            const phone = items.find(i => i.Name === 'PhoneNumber').Value;

            // 1. Update Payment status
            await db.execute(
                'UPDATE payments SET status = ?, mpesa_receipt = ? WHERE mpesa_checkout_id = ?',
                ['completed', receipt, CheckoutRequestID]
            );

            // 2. Update Order status
            // We need to find the order_id from the payment record
            const [payments] = await db.execute('SELECT order_id FROM payments WHERE mpesa_checkout_id = ?', [CheckoutRequestID]);
            if (Array.isArray(payments) && payments.length > 0) {
                const orderId = payments[0].order_id;
                await db.execute(
                    'UPDATE orders SET payment_status = ?, mpesa_ref = ? WHERE id = ?',
                    ['paid', receipt, orderId]
                );
            }

            // 3. Send SMS Confirmation
            await sendOrderConfirmation(phone, receipt, amount);

            return NextResponse.json({ ResultCode: 0, ResultDesc: 'Success' });
        } else {
            // Payment Failed or Cancelled
            await db.execute(
                'UPDATE payments SET status = ? WHERE mpesa_checkout_id = ?',
                ['failed', CheckoutRequestID]
            );
            return NextResponse.json({ ResultCode: 1, ResultDesc: 'Transaction failed' });
        }

    } catch (err) {
        console.error('M-Pesa callback processing error:', err);
        // Always return 0 to Safaricom if the JSON was valid, to prevent retries if it's our logic error
        return NextResponse.json({ ResultCode: 0, ResultDesc: 'Error processed' });
    }
}
