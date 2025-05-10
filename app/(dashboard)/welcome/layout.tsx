"use client";

import React from 'react';

export default function WelcomeLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
      {children}
    </div>
  );
}
