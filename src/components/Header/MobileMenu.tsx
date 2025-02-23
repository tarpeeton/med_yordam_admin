'use client';
import { FC } from 'react';
import { IoClose } from 'react-icons/io5';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import LogoDefault from '../../public/menu/Logo.svg';

interface MobileMenuProps {
  closeMenu: () => void;
}

const MobileMenu: FC<MobileMenuProps> = ({ closeMenu }) => {
  const locale = useLocale();

  return (
    <div className="fixed inset-0 z-10 bg-[#00000080]">
      <div className="absolute right-0 top-0 z-10 h-[495px] w-[80%] bg-[#F6FAFF]">
        <div className="flex h-[59px] items-center justify-end">
          <button onClick={closeMenu} className="mr-[20px] h-[24px] w-[24px]">
            <IoClose className="h-full w-full text-titleDark" />
          </button>
        </div>
        {/* Add more menu content here */}
        <div className="mt-[41px] w-full px-[41px]">
          <Image
            src={LogoDefault}
            alt=""
            width={300}
            height={90}
            quality={100}
            className="h-full w-full object-cover"
          />
          <div className="mt-[31px] flex flex-col gap-[12px]">
            <Link
              href={'/login'}
              className="min-w-[120px] rounded-full bg-white py-[15px] text-center text-[14px] font-medium"
            >
              {locale === 'ru' ? 'Вход' : locale === 'uz' ? 'Kirish' : 'Login'}
            </Link>
            <Link
              href="/register"
              className="min-w-[120px] rounded-full bg-white py-[15px] text-center text-[14px] font-medium text-[#0129E3]"
            >
              {locale === 'ru'
                ? 'Регистрация'
                : locale === 'uz'
                  ? "Ro'yhatdan o'tish"
                  : 'Register'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
