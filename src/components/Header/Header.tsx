"use client"
import {  FC, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { SlLocationPin } from "react-icons/sl";
import { RiArrowDownSLine } from "react-icons/ri";
import { useLocale } from 'next-intl';
import LanguageSwitcher from '@/components/Header/LanguageSwither';
import MobileMenu from '@/components/Header/MobileMenu';


const Header: FC = () => {
  const locale = useLocale()
  const [menu , setMenu] = useState(false)

  const SwitcherMenuMobile = () => setMenu(!menu)

    return (
      <header className='flex flex-row justify-between items-center h-[59px] px-[16px] slg:px-[20px] 2xl:px-[100px]'>
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
      </header>
    )
}







export default Header;