'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Main = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || !role) {
      router.push('/register');
    }
  }, [router]);

  return <div className="px-[16px] slg:px-[20px] 2xl:px-[100px]"></div>;
};

export default Main;
