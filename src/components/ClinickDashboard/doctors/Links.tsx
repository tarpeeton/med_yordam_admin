'use client';
import { useRegisterLinks } from '@/store/clinick/doctor/createLinksStore';
import Image from 'next/image';
import { BiLogoTelegram } from 'react-icons/bi';
import { FaFacebookF } from 'react-icons/fa';
import { FaYoutube } from 'react-icons/fa';
import { FaPhoneAlt } from 'react-icons/fa';
import Instagram from '@/public/instagram.svg';
import toastr from 'toastr';

import { useLocale } from 'next-intl';
import { ILangTopProps } from '@/interface/langtopProps';
import SaveButton from '@/ui/saveButton';

const DashboardLinks = ({ selectedInputLang }: ILangTopProps) => {
  const locale = useLocale();

  const {
    instagram,
    setInstagram,
    phone,
    setPhone,
    telegram,
    setTelegram,
    facebook,
    setFacebook,
    youtube,
    setYoutube,
    save,
  } = useRegisterLinks();

  const handleSave = async () => {
    const success = await save();
    const message =
      locale === 'ru'
        ? success
          ? 'успешно сохранён!'
          : 'Ошибка при сохранении'
        : locale === 'uz'
          ? success
            ? 'muvaffaqiyatli saqlandi!'
            : 'Saqlashda xatolik yuz berdi.'
          : success
            ? 'saved successfully!'
            : 'Error saving profile.';

    toastr[success ? 'success' : 'error'](message);
  };

  return (
    <div className="mt-[25px] 2xl:mt-[37px]">
      <div className="flex flex-col 2xl:flex-row 2xl:flex-wrap 2xl:gap-[2%]">
        {/* inputs */}
        <div className="mt-[20px] flex w-full flex-col gap-[12px] rounded-[18px] bg-white p-[15px] 2xl:mt-0 2xl:gap-[20px] 2xl:px-[25px] 2xl:py-[37px]">
          <div className="relative">
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={
                selectedInputLang === 'ru'
                  ? 'Номер телефона'
                  : selectedInputLang === 'uz'
                    ? 'Telefon Raqam'
                    : 'Phone Number'
              }
              className="focus:ring-ring w-full rounded-[12px] bg-[#F8F8F8] px-[15px] py-[18px] pl-[50px] text-[#747474] focus:outline-none focus:ring-1"
            />
            <FaPhoneAlt className="text-muted-foreground absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#0129E3]" />
          </div>
          <div className="relative">
            <input
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              placeholder="Instagram"
              className="focus:ring-ring w-full rounded-[12px] bg-[#F8F8F8] px-[15px] py-[18px] pl-[50px] text-[#747474] focus:outline-none focus:ring-1"
            />
            <div className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2">
              <Image
                src={Instagram}
                alt="Instagram link image"
                width={44}
                height={44}
                quality={100}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="relative">
            <input
              value={telegram}
              onChange={(e) => setTelegram(e.target.value)}
              placeholder="Telegram"
              className="focus:ring-ring w-full rounded-[12px] bg-[#F8F8F8] px-[15px] py-[18px] pl-[50px] text-[#747474] focus:outline-none focus:ring-1"
            />
            <BiLogoTelegram className="text-muted-foreground absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-500" />
          </div>
          <div className="relative">
            <input
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
              placeholder="Facebook"
              className="focus:ring-ring w-full rounded-[12px] bg-[#F8F8F8] px-[15px] py-[18px] pl-[50px] text-[#747474] focus:outline-none focus:ring-1"
            />
            <FaFacebookF className="text-muted-foreground absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#0077FF]" />
          </div>

          <div className="relative">
            <input
              value={youtube}
              onChange={(e) => setYoutube(e.target.value)}
              placeholder="Youtube"
              className="focus:ring-ring w-full rounded-[12px] bg-[#F8F8F8] px-[15px] py-[18px] pl-[50px] text-[#747474] focus:outline-none focus:ring-1"
            />
            <FaYoutube className="text-muted-foreground absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#FF0302]" />
          </div>
        </div>
        {/* BUTTON SAVE */}
        <div className="mt-[25px] flex w-full items-center 2xl:order-[3] 2xl:w-[100%] 2xl:justify-end">
          <div className="2xl:w-64">
            <SaveButton
              selectedInputLang={selectedInputLang}
              onClick={handleSave}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLinks;
