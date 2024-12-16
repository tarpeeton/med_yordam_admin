"use client";
import { FC } from "react";
import { IoClose } from "react-icons/io5";
import Image from 'next/image';
import LogoDefault from '../../public/menu/Logo.svg'
import { useLocale } from 'next-intl';





interface MobileMenuProps {
  closeMenu: () => void
}

const MobileMenu: FC<MobileMenuProps> = ({ closeMenu }) => {
  const locale = useLocale()


  return (
    <div className="fixed inset-0 z-10 bg-[#00000080]"> 
     <div className="absolute w-[80%] right-0 bg-[#F6FAFF] top-0 z-10 h-[495px]">
      <div className="flex items-center justify-end h-[59px]">
        <button onClick={closeMenu} className="w-[24px] h-[24px] mr-[20px]">
          <IoClose className="text-titleDark w-full h-full" />
        </button>
      </div>
      {/* Add more menu content here */}
      <div className='mt-[41px] px-[41px] w-full'>
        <Image src={LogoDefault} alt="" width={300} height={90} quality={100} className='w-full h-full object-cover' />
        <div className='mt-[31px] flex flex-col gap-[12px]'>
          <button className='py-[15px] min-w-[120px] text-[14px] rounded-full bg-white font-medium'>
           
            {locale === 'ru' ? " О проекте": locale ==='uz' ? 'Loyiha haqida': locale === 'en' ? 'About the project' : "About the project"}
            </button>
          <button className='py-[15px] min-w-[120px] text-[14px] rounded-full bg-white text-[#0129E3] font-medium'>

          {locale === 'ru' ? "Регистрация": locale ==='uz' ? 'Ro\'yhatdan o\'tish':  'Register' }

          </button>
        </div>
      </div>
    </div>
    </div>
   
  );
};

export default MobileMenu;
