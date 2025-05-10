'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth.context';

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in the useEffect
  }
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Welcome to your Dashboard, {user?.firstName}!
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-400 sm:mt-4">
            This is your personal Credenza dashboard where you can manage all your financing and credit needs.
          </p>
          
          {/* Authentication Status Information */}
          <div className="mt-8 p-6 bg-gray-800 rounded-lg shadow-lg max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold text-white mb-4">Authentication Status</h2>
            <div className="text-left">
              <div className="grid grid-cols-2 gap-2">
                <div className="text-gray-400">Authenticated:</div>
                <div className="text-green-500 font-bold">{isAuthenticated ? 'Yes' : 'No'}</div>
                
                <div className="text-gray-400">User ID:</div>
                <div className="text-white">{user?.id || 'Not available'}</div>
                
                <div className="text-gray-400">Email:</div>
                <div className="text-white">{user?.email || 'Not available'}</div>
                
                <div className="text-gray-400">Name:</div>
                <div className="text-white">{user ? `${user.firstName} ${user.lastName}` : 'Not available'}</div>
                
                <div className="text-gray-400">Role:</div>
                <div className="text-white">{user?.role || 'Not available'}</div>
                
                <div className="text-gray-400">Creator ID:</div>
                <div className="text-white">{user?.creatorId || 'Not available'}</div>
              </div>
            </div>
            <button 
              className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              onClick={() => isAuthenticated && logout()}
            >
              Logout
            </button>
          </div>
        </div>
          <div className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-gray-800">
            <div className="p-6 flex-1">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-white">Credit Score</h3>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-gray-400">View and monitor your current creator credit score.</p>
              </div>
              <div className="mt-6">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  View Score
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-gray-800">
            <div className="p-6 flex-1">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-white">Applications</h3>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-gray-400">Manage your active financing applications and their status.</p>
              </div>
              <div className="mt-6">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  View Applications
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-gray-800">
            <div className="p-6 flex-1">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-white">Analytics</h3>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-gray-400">View insights from your connected platform accounts.</p>
              </div>
              <div className="mt-6">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  View Analytics
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
