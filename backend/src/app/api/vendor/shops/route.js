import { NextResponse } from 'next/server';
import { getDbConnection } from '@/lib/db';
import { protect } from '@/lib/auth';

// POST Create new shop (Vendor only)
export async function POST(req) {
    const auth = await protect(req);
    if (auth.error) {
        return NextResponse.json({ message: auth.error }, { status: auth.status });
    }

    if (auth.user.role !== 'vendor' && auth.user.role !== 'admin') {
        return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    try {
        const { name, description, category, logo_url, banner_url, phone, location } = await req.json();
        const db = getDbConnection();

        // Generate slug from name
        const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') + '-' + Date.now().toString().slice(-4);

        const [result] = await db.execute(
            'INSERT INTO shops (vendor_id, name, slug, description, category, logo_url, banner_url, phone, location) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [auth.user.id, name, slug, description, category, logo_url, banner_url, phone, location]
        );

        return NextResponse.json({ message: 'Shop created successfully', shopId: result.insertId, slug }, { status: 201 });
    } catch (err) {
        console.error('Shop creation error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// GET vendor's shops
export async function GET(req) {
    const auth = await protect(req);
    if (auth.error) {
        return NextResponse.json({ message: auth.error }, { status: auth.status });
    }

    try {
        const db = getDbConnection();
        const [shops] = await db.execute('SELECT * FROM shops WHERE vendor_id = ?', [auth.user.id]);
        return NextResponse.json(shops, { status: 200 });
    } catch (err) {
        console.error('Fetch user shops error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
