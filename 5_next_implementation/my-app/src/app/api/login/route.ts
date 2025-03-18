import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

interface UserRow extends RowDataPacket {
  id: number;
  first_name: string;
  last_name: string;
  pwd_hash: string;
}

export async function POST(request: Request) {
  try {
    const { firstName, password } = await request.json();

    if (!firstName || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const [users] = await pool.execute<UserRow[]>(
      'SELECT * FROM users WHERE first_name = ?',
      [firstName]
    );

    const user = users[0];

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.pwd_hash);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { userId: user.id, firstName: user.first_name },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' }
    );

    // Create response with token in JSON
    const response = NextResponse.json({ token });

    // Set HTTP-only cookie with the token
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 3600 // 1 hour in seconds
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 