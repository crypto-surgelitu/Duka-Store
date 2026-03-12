import { NextResponse } from 'next/server';
import { getDbConnection } from '@/lib/db';
import { protect } from '@/lib/auth';

// GET orders for the vendor's shops
export async function GET(req) {
    const auth = await protect(req);
    if (auth.error) {
        return NextResponse.json({ message: auth.error }, { status: auth.status });
    }

    if (auth.user.role !== 'vendor' && auth.user.role !== 'admin') {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    try {
        const db = getDbConnection();
        // Get orders for all shops owned by this vendor
        const [orders] = await db.execute(`
      SELECT o.*, u.name as buyer_name, u.phone as buyer_phone
      FROM orders o
      JOIN shops s ON o.shop_id = s.id
      JOIN users u ON o.buyer_id = u.id
      WHERE s.vendor_id = ?
      ORDER BY o.created_at DESC
    `, [auth.user.id]);

        return NextResponse.json(orders, { status: 200 });
    } catch (err) {
        console.error('Fetch vendor orders error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
