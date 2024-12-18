'use client'
import { FC } from 'react'
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { useRouter } from "next/router";

// SUCCES Image
import Error from '@/public/modal/error.png'

interface IModalProps {
  open: boolean
  close: () => void
}


export const ErrorModal: FC<IModalProps> = ({ open, close }) => {



  if (!open) return null; // Do not render when modal is closed

  return (
    <div onClick={close} className="fixed inset-0 z-50 bg-[#050B2B] bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="py-[30px] px-[24px] w-[90%] 2xl:w-[690px] relative overflow-hidden bg-gradient-to-tl from-[#379FF2] to-[#022FE4] shadow-lg rounded-[30px] ">
        <div className='absolute top-[-5px] right-[-5px] h-[180px] 2xl:h-[220px]'>
          <Image src={Error} alt="Image One" width={300} height={300} quality={100} className='w-full h-full object-cover' />
        </div>
        <div className='2xl:flex 2xl:flex-col 2xl:items-center'>
          <h3 className="text-[30px] w-[70%] slg:w-full 2xl:text-center slg:text-[45px] 2xl:text-[50px] text-left text-white font-medium">
            Ошибка регистрации
          </h3>

          <p className='mt-[16px]  2xl:w-[60%] text-white 2xl:text-center text-left font-medium text-[15px] slg:text-[16px] 2xl:text-[16.5px]'>
            К сожалению, произошла ошибка при регистрации. Пожалуйста, попробуйте снова
          </p>

        </div>
        <div className='mt-[30px] slg:mt-[35px]'>
          <Link href={'/register'} className='w-full  h-full '>
            <p className='text-[14px] w-full h-[55px] font-medium slg:text-[15px] rounded-[12px] flex items-center justify-center bg-white  text-[#202020] 2xl:h-[76px] 2xl:text-[17px]'>
              Попробовать еще раз

            </p>
          </Link>
        </div>


      </div>
    </div>
  );
}