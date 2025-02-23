'use client';
import { useEffect } from 'react';
import DashboardSwitchers from './Switchers';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { ILangTopProps } from '@/interface/langtopProps';

const DashboardMain = ({ selectedInputLang }: ILangTopProps) => {
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
    <div className="mt-[20px]">
      <DashboardSwitchers selectedInputLang={selectedInputLang} />
    </div>
  );
};

export default DashboardMain;
