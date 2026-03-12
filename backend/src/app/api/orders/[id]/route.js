import { NextResponse } from 'next/server';
import { getDbConnection } from '@/lib/db';
import { protect } from '@/lib/auth';

// GET Single Order
export async function GET(req, { params }) {
    const auth = await protect(req);
    if (auth.error) {
        return NextResponse.json({ message: auth.error }, { status: auth.status });
    }

    const { id } = await params;

    try {
        const db = getDbConnection();
        const [order] = await db.execute(`
      SELECT o.*, s.name as shop_name, s.vendor_id
      FROM orders o
      JOIN shops s ON o.shop_id = s.id
      WHERE o.id = ?
    `, [id]);

        if (!Array.isArray(order) || order.length === 0) {
            return NextResponse.json({ message: 'Order not found' }, { status: 404 });
        }

        const orderData = order[0];

        // Check permissions: Buyer or Vendor of the shop
        if (orderData.buyer_id !== auth.user.id && orderData.vendor_id !== auth.user.id && auth.user.role !== 'admin') {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
        }

        return NextResponse.json(orderData, { status: 200 });
    } catch (err) {
        console.error('Fetch order detail error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// PATCH Update Order Status (Vendor/Admin)
export async function PATCH(req, { params }) {
    const auth = await protect(req);
    if (auth.error) {
        return NextResponse.json({ message: auth.error }, { status: auth.status });
    }

    const { id } = await params;
    const { status } = await req.json();

    if (!['processing', 'shipped', 'delivered', 'cancelled'].includes(status)) {
        return NextResponse.json({ message: 'Invalid status' }, { status: 400 });
    }

    try {
        const db = getDbConnection();

        // Check if user is the vendor for this order
        const [order] = await db.execute(`
      SELECT s.vendor_id 
      FROM orders o
      JOIN shops s ON o.shop_id = s.id
      WHERE o.id = ?
    `, [id]);

        if (!Array.isArray(order) || order.length === 0) {
            return NextResponse.json({ message: 'Order not found' }, { status: 404 });
        }

        if (order[0].vendor_id !== auth.user.id && auth.user.role !== 'admin') {
            return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
        }

        await db.execute('UPDATE orders SET status = ? WHERE id = ?', [status, id]);

        return NextResponse.json({ message: `Order status updated to ${status}` }, { status: 200 });
    } catch (err) {
        console.error('Update order status error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
