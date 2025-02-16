'use client';
import { FC, useState } from 'react';
import { SlLocationPin } from 'react-icons/sl';
import { RiArrowDownSLine } from 'react-icons/ri';
import { useLocale, useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/Header/LanguageSwither';
import MobileMenu from '@/components/Header/MobileMenu';
import LogoDefault from '../../public/menu/Logo.svg';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { RxHamburgerMenu } from 'react-icons/rx';

const Header: FC = () => {
  const locale = useLocale() as 'ru' | 'uz' | 'en';
  const t = useTranslations();
  const [menu, setMenu] = useState(false);
  const SwitcherMenuMobile = () => setMenu(!menu);

  return (
    <header>
      <div className="flex h-20 flex-row items-center justify-between px-4 mdl:px-5 2xl:h-[97px] 4xl:px-24">
        <div>
          <Image
            src={LogoDefault}
            alt="Med Yordam Logo"
            width={300}
            height={100}
            quality={100}
            className="h-10 w-52"
          />
        </div>
        <div className="hidden flex-row gap-5 3xl:flex">
          {/* <Link
            href="/searchmap"
            className="flex h-12 items-center justify-center rounded-full border border-MyBlue px-6 font-bold text-MyBlue transition-all duration-100 hover:bg-MyBlue hover:text-white"
          >
            {t('Header.showMap')}
          </Link> */}
          <LanguageSwitcher />
          <Link
            href="/logout"
            className="flex h-12 w-52 items-center justify-center rounded-full border bg-MyBlue px-6 font-bold text-white transition-all duration-150 hover:border hover:border-MyBlue hover:bg-white hover:text-MyBlue"
          >
            {t('register')}
          </Link>
        </div>
        <button
          onClick={() => SwitcherMenuMobile()}
          className="h-10 3xl:hidden"
        >
          <RxHamburgerMenu className="h-6 w-6 text-[#050B2B]" />
        </button>

        {menu && <MobileMenu closeMenu={() => SwitcherMenuMobile()} />}
      </div>
    </header>
  );
};

export default Header;
