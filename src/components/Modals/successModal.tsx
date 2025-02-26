'use client';
import { FC } from 'react';
import { Link } from '@/i18n/routing';
import Image from 'next/image';

// SUCCES Image
import Success from '@/public/modal/success.png';
import { useLocale } from 'next-intl';

interface IModalProps {
  open: boolean;
  close: () => void;
  title: { ru: string; uz: string; en: string };
  subtitle: { ru: string; uz: string; en: string };
}

export const SuccessModal: FC<IModalProps> = ({
  open,
  close,
  title,
  subtitle,
}) => {
  const locale = useLocale() as 'ru' | 'uz' | 'en';

  // Prevent the click event from propagating to the overlay
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (!open) return null; // Do not render when modal is closed

  return (
    <div
      onClick={close}
      className="fixed inset-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto bg-[#050B2B] bg-opacity-50"
    >
      <div className="relative w-[90%] overflow-hidden rounded-[30px] bg-gradient-to-tl from-[#379FF2] to-[#022FE4] px-[24px] py-[30px] shadow-lg 2xl:w-[690px]">
        <div className="absolute right-[-5px] top-[-5px]">
          <Image
            src={Success}
            alt="Image One"
            width={300}
            height={300}
            quality={100}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="2xl:flex 2xl:flex-col 2xl:items-center">
          <h3 className="text-left text-[30px] font-medium text-white slg:text-[45px] 2xl:text-center 2xl:text-[50px]">
            {title[locale]}
          </h3>

          <p className="mt-[16px] text-left text-[15px] font-medium text-white slg:text-[16px] 2xl:w-[60%] 2xl:text-center 2xl:text-[16.5px]">
            {subtitle[locale]}
          </p>
        </div>
        <div className="mt-[30px] slg:mt-[35px]">
          <Link href={'/login'} className="h-full w-full">
            <p className="flex h-[55px] w-full items-center justify-center rounded-[12px] bg-white text-[14px] font-medium text-[#202020] slg:text-[15px] 2xl:h-[76px] 2xl:text-[17px]">
              Продолжить
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};
