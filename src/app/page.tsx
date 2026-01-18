'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the landing page
    router.push('/landing/index.html');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p className="text-neutral-500 animate-pulse">Loading Arena...</p>
    </div>
  );
}
