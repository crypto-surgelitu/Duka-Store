import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getDbConnection } from '@/lib/db';

export async function POST(req) {
    try {
        const { name, email, password, phone, role } = await req.json();
        const db = getDbConnection();

        // Check if user exists
        const [existing] = await db.execute('SELECT email FROM users WHERE email = ?', [email]);
        if (Array.isArray(existing) && existing.length > 0) {
            return NextResponse.json({ message: 'Email already in use' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const assignedRole = role || 'customer';

        const [result] = await db.execute(
            'INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)',
            [name, email, hashedPassword, phone, assignedRole]
        );

        return NextResponse.json({ message: 'User created successfully', userId: result.insertId }, { status: 201 });
    } catch (err) {
        console.error('Registration error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
