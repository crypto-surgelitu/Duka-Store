import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDbConnection } from '@/lib/db';

export async function POST(req) {
    try {
        const { email, password } = await req.json();
        const db = getDbConnection();

        const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (!Array.isArray(users) || users.length === 0) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
        }

        const token = jwt.sign(
            { id: user.id, name: user.name, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
        );

        return NextResponse.json({
            token,
            user: { id: user.id, name: user.name, email: user.email, role: user.role }
        }, { status: 200 });
    } catch (err) {
        console.error('Login error:', err);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
