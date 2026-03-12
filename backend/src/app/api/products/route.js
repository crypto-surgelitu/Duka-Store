import { NextResponse } from 'next/server';
import { getDbConnection } from '@/lib/db';
import { protect } from '@/lib/auth';

// GET all products (Public)
export async function GET() {
    try {
        const db = getDbConnection();
        const [products] = await db.execute(`
      SELECT p.*, s.name as shop_name 
      FROM products p 
      JOIN shops s ON p.shop_id = s.id 
      WHERE p.status = 'active'
      ORDER BY p.created_at DESC
    `);
        return NextResponse.json(products, { status: 200 });
    } catch (err) {
        console.error('Fetch products error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// POST new product (Protected - Vendor only)
export async function POST(req) {
    const auth = await protect(req);
    if (auth.error) {
        return NextResponse.json({ message: auth.error }, { status: auth.status });
    }

    if (auth.user.role !== 'vendor' && auth.user.role !== 'admin') {
        return NextResponse.json({ message: 'Forbidden: Vendors only' }, { status: 403 });
    }

    try {
        const data = await req.json();
        const db = getDbConnection();

        const [result] = await db.execute(
            'INSERT INTO products (shop_id, title, description, price, stock, category, images) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [
                data.shop_id,
                data.title,
                data.description,
                data.price,
                data.stock || 0,
                data.category,
                JSON.stringify(data.images || [])
            ]
        );

        return NextResponse.json({ message: 'Product created successfully', productId: result.insertId }, { status: 201 });
    } catch (err) {
        console.error('Create product error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
