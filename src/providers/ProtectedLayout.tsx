'use client';
import { useEffect } from 'react';
import { getToken } from '@/utils/auth';
import { useRouter } from 'next/navigation';

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    if (!getToken()) {
      router.push('/ru/login');
    }
  }, []);

  return <>{children}</>;
};

export default ProtectedLayout;
