'use client'
import {FC} from 'react'
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { useRouter } from "next/router";

// SUCCES Image
import Success from '@/public/modal/success.png'
import { useLocale } from 'next-intl';

interface IModalProps {
  open: boolean
  close: () => void
  title: {ru: string , uz:string , en:string},
  subtitle: {ru: string , uz:string , en:string},
}


export const SuccessModal: FC<IModalProps> = ({ open, close , title , subtitle }) => {
  const locale = useLocale() as 'ru' | 'uz' | 'en';
  
 // Prevent the click event from propagating to the overlay
 const handleContentClick = (e: React.MouseEvent) => {
  e.stopPropagation();
};

if (!open) return null; // Do not render when modal is closed

  return (
    <div onClick={close} className="fixed inset-0 z-50 bg-[#050B2B] bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="py-[30px] px-[24px] w-[90%] 2xl:w-[690px] relative overflow-hidden bg-gradient-to-tl from-[#379FF2] to-[#022FE4] shadow-lg rounded-[30px] ">
        <div className='absolute top-[-5px] right-[-5px] '>
          <Image src={Success} alt="Image One" width={300} height={300} quality={100} className='w-full h-full object-cover' />
        </div>
        <div className='2xl:flex 2xl:flex-col 2xl:items-center'>
        <h3 className="text-[30px] 2xl:text-center slg:text-[45px] 2xl:text-[50px] text-left text-white font-medium">
          {title[locale]}
          </h3>
         
         <p className='mt-[16px]  2xl:w-[60%] text-white 2xl:text-center text-left font-medium text-[15px] slg:text-[16px] 2xl:text-[16.5px]'>
         {subtitle[locale]}
         </p>
        
        </div>
        <div className='mt-[30px] slg:mt-[35px]'>
         <Link  href={'/dashboard'}  className='w-full  h-full '>
         <p className='text-[14px] w-full h-[55px] font-medium slg:text-[15px] rounded-[12px] flex items-center justify-center bg-white  text-[#202020] 2xl:h-[76px] 2xl:text-[17px]'>
         Продолжить

         </p>
         </Link>
         </div>
      

      </div>
    </div>
  );
}