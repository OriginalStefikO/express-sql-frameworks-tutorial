'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import jwt from 'jsonwebtoken';


export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ firstName: string } | null>(null);


  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.log('No token found, logging out...');
        await fetch('/api/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        
        localStorage.removeItem('token');
        document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        router.push('/login');
        return;
      }

      try {
        const decodedToken = jwt.decode(token) as { firstName: string } | null;
        if (!decodedToken) throw new Error('Invalid token');

        setUser(decodedToken);
        console.log('User authenticated:', decodedToken);
      } catch (error) {
        console.error('Token decoding failed:', error);
        handleLogout();
      }
    };

    checkAuth();
  }, []); // Empty dependency array to run only once on mount
  const handleLogout = async () => {
    try {
      await fetch('/api/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Logout API request failed:', error);
    }

    localStorage.removeItem('token');
    document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    router.push('/login');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
            <h2 className="text-2xl font-semibold text-gray-600">
              Welcome, {user.firstName}!
            </h2>
          </div>
        </div>
      </main>
    </div>
  );
} 