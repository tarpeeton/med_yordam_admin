"use client"
import { useEffect  } from 'react';
import DashboardSwitchers from './Switchers'
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';


const DashboardMain = () => {
  const router = useRouter();
  const locale = useLocale();
  const token = sessionStorage.getItem("token");


  useEffect(() => {
    // token bo'lmasa, login sahifasiga redirect qilamiz
    if (!token) {
      router.replace(`/${locale !== 'default' ? locale : ''}/login`);
    }
  }, [router]);


    if(!token) return null

  return (
    <div className='px-[16px] 2xl:px-[60px] 3xl:px-[100px] mt-[20px]'>
        <DashboardSwitchers />
    </div>
  )
}


export default DashboardMain