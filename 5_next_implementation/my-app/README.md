# Building an Authentication System with Next.js

This guide will walk you through creating a complete authentication system using Next.js, TypeScript, and MySQL.

## Prerequisites

Before you begin, make sure you have:
- Node.js (v18 or later) installed
- MySQL (XAMPP) installed and running
- Basic understanding of TypeScript and React

## Step 1: Create a New Next.js Project

First, create a new Next.js project with TypeScript:

```bash
npx create-next-app@latest my-app --typescript --tailwind --eslint
cd my-app
```

## Step 2: Install Required Dependencies

Install the necessary packages for authentication:

```bash
npm install bcryptjs jsonwebtoken mysql2
npm install @types/bcryptjs @types/jsonwebtoken --save-dev
```

## Step 3: Set Up MySQL Database

1. Start your MySQL server (XAMPP)
2. Create a new database and table:

```sql
CREATE DATABASE workshop;
USE workshop;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    pwd_hash VARCHAR(100)
);
```

## Step 4: Configure Environment Variables

Create a `.env` file in your project root:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=workshop
JWT_SECRET=your-secret-key-here
```

## Step 5: Create Project Structure

Create the following directory structure:

```
src/
├── app/
│   ├── api/
│   │   ├── login/
│   │   └── register/
│   ├── dashboard/
│   ├── login/
│   └── register/
├── components/
│   └── auth/
└── lib/
```

## Step 6: Implement Database Connection

Create `src/lib/db.ts`:

```typescript
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
```

## Step 7: Create Authentication Components

1. Create `src/components/auth/LoginForm.tsx`:
```typescript
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implement login logic
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        Login
      </button>
    </form>
  );
}
```

2. Create `src/components/auth/RegisterForm.tsx` similarly.

## Step 8: Implement API Routes

1. Create `src/app/api/register/route.ts`:
```typescript
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import pool from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { firstName, lastName, password } = await request.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const [result] = await pool.execute(
      'INSERT INTO users (first_name, last_name, pwd_hash) VALUES (?, ?, ?)',
      [firstName, lastName, hashedPassword]
    );

    return NextResponse.json({ message: 'User registered successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 });
  }
}
```

2. Create `src/app/api/login/route.ts` similarly.

## Step 9: Create Pages

1. Create `src/app/login/page.tsx`:
```typescript
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}
```

2. Create `src/app/register/page.tsx` similarly.

## Step 10: Implement Protected Routes

Create `src/middleware.ts`:
```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');

  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*',
};
```

## Step 11: Run the Application

Start the development server:

```bash
npm run dev
```

Visit `http://localhost:3000` to see your application.

## Additional Features to Implement

1. Form validation
2. Error handling
3. Loading states
4. Password reset functionality
5. Email verification
6. Remember me functionality
7. Session management

## Security Considerations

1. Always use HTTPS in production
2. Implement rate limiting
3. Add CSRF protection
4. Use secure session management
5. Implement proper password policies
6. Add input validation and sanitization

## Testing

1. Set up Jest and React Testing Library
2. Write unit tests for components
3. Write integration tests for API routes
4. Implement end-to-end testing with Cypress

## Deployment

1. Set up a production database
2. Configure environment variables
3. Deploy to Vercel or your preferred hosting platform
4. Set up CI/CD pipeline

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [JWT Documentation](https://jwt.io/)
- [bcrypt Documentation](https://github.com/dcodeIO/bcrypt.js)
