"use client"
import {  FC, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { SlLocationPin } from "react-icons/sl";
import { RiArrowDownSLine } from "react-icons/ri";
import { useLocale } from 'next-intl';
import LanguageSwitcher from '@/components/Header/LanguageSwither';
import MobileMenu from '@/components/Header/MobileMenu';
import LogoDefault from '../../public/menu/Logo.svg'
import Image from 'next/image';

const Header: FC = () => {
  const locale = useLocale()
  const [menu , setMenu] = useState(false)

  const SwitcherMenuMobile = () => setMenu(!menu)

    return (
      <header >
        <div className='flex flex-row justify-between items-center h-[59px] px-[16px] slg:px-[20px] 2xl:px-[100px]'>
        <button className='flex flex-row items-center flex-grow-[1]'>
            <SlLocationPin className='mr-[4px] mdl:mr-[8px] text-[#0129E3] w-[16px] h-[16px] '/>
              <p className='text-[15px] slg:text-[16px] '>
                {locale === 'ru' ? 'Ташкент' : locale === 'uz' ? 'Toshkent' : 'Tashkent'}
              </p>
              <p className='ml-[8px] w-[16px] h-[16px] '>
                <RiArrowDownSLine className='w-full h-full text-[#747474]'/>
              </p>
          </button>
        {/* LANGUAGE SWITCHER */}
          <LanguageSwitcher />

          {/* MENU */}
          <button  onClick={SwitcherMenuMobile} className='w-[24px] h-[24px]  mdl:hidden'>
        <RxHamburgerMenu className='text-[#000000] w-full h-full' />
        {menu && <MobileMenu closeMenu={SwitcherMenuMobile } />}
      </button>
        </div>
         
        <div className='px-[16px] slg:px-[20px] 2xl:px-[100px]'>
        <div className='h-[79px] px-[20px] mdl:flex items-center justify-between flex-row flex-nowrap hidden'>
        <div>
          <img src={LogoDefault.src} alt="" width={300} height={90} className='w-full h-full object-cover' />
        </div>
        <div className='flex flex-row gap-[8px] mdl:w-[50%] slg:w-[40%]'>
          <button className='bg-white py-[17px] w-[50%] rounded-tl-[20px] rounded-bl-[20px] flex items-center justify-center text-[16px] '>
            {locale === 'ru' ? " О проекте" : locale === 'uz' ? 'Loyiha haqida' : locale === 'en' ? 'About the project' : "About the project"}
          </button>
          <button className='bg-white py-[17px] w-[50%] rounded-tr-[20px] rounded-br-[20px] flex items-center justify-center text-[16px] text-[#0129E3]'>
            {locale === 'ru' ? "Регистрация" : locale === 'uz' ? 'Ro\'yhatdan o\'tish' : 'Register'}
          </button>
        </div>
      </div>
        </div>


      
      </header>
    )
}







export default Header;