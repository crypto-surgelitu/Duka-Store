import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

/**
 * Verifies a JWT token from the Authorization header.
 * @param {Request} request The incoming Next.js request.
 * @returns {Promise<{user: any, status: number, error?: string}>}
 */
export async function protect(request) {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return { error: 'Not authorized', status: 401 };
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return { user: decoded, status: 200 };
    } catch (error) {
        return { error: 'Token invalid or expired', status: 401 };
    }
}

/**
 * Checks if the user has the required role.
 * @param {any} user The decoded user from the token.
 * @param {string[]} requiredRoles List of allowed roles.
 * @returns {boolean}
 */
export function checkRole(user, requiredRoles) {
    return requiredRoles.includes(user.role);
}
