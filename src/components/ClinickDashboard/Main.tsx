'use client';
import { useEffect } from 'react';
import DashboardSwitchers from './Switcher';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export const ClinickDashboardMain = () => {
  const router = useRouter();
  const locale = useLocale();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      router.replace(`/${locale !== 'default' ? locale : ''}/login`);
    }
  }, [router]);

  if (!token) return null;

  return (
    <div className="mt-[20px] px-[16px] 2xl:px-[60px] 3xl:px-[100px]">
      <DashboardSwitchers />
    </div>
  );
};
