import { NextResponse } from 'next/server';
import { getDbConnection } from '@/lib/db';
import { protect } from '@/lib/auth';

// GET orders for the logged-in customer
export async function GET(req) {
    const auth = await protect(req);
    if (auth.error) {
        return NextResponse.json({ message: auth.error }, { status: auth.status });
    }

    try {
        const db = getDbConnection();
        const [orders] = await db.execute(`
      SELECT o.*, s.name as shop_name, s.logo_url as shop_logo
      FROM orders o
      JOIN shops s ON o.shop_id = s.id
      WHERE o.buyer_id = ?
      ORDER BY o.created_at DESC
    `, [auth.user.id]);

        return NextResponse.json(orders, { status: 200 });
    } catch (err) {
        console.error('Fetch user orders error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
