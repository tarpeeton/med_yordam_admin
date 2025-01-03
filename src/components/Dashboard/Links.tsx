"use client";
import { useRegisterLinks } from '@/store/createLinksStore';
import { FC } from 'react';
import Image from 'next/image';
import { BiLogoTelegram } from "react-icons/bi";
import { FaFacebookF } from 'react-icons/fa'
import { FaYoutube } from 'react-icons/fa'
import { FaPhoneAlt } from "react-icons/fa";
import Instagram from '@/public/instagram.svg'
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { useLocale } from 'next-intl';


interface ILinksProps {
  selectedInputLang: "ru" | "uz" | "en";
}



const DashboardLinks: FC<ILinksProps> = ({ selectedInputLang }) => {
  const locale = useLocale();

  const { instagram, setInstagram, phone, setPhone, success, telegram, setTelegram, facebook, setFacebook, youtube, setYoutube, save, } = useRegisterLinks()



const handleSave = () => {
  save();
    if (success) {
      const successMessage =
        locale === 'ru'
          ? "успешно сохранён!"
          : locale === 'uz'
          ? "muvaffaqiyatli saqlandi!"
          : "saved successfully!";
  
      toastr.success(successMessage);
    } else {
      const errorMessage =
        locale === 'ru'
          ? "Ошибка при сохранении"
          : locale === 'uz'
          ? "Saqlashda xatolik yuz berdi."
          : "Error saving profile.";
  
      toastr.error(errorMessage);
    }
  };



  return (
    <div className='mt-[25px] 2xl:mt-[37px]'>
      <div className='flex flex-col 2xl:flex-row 2xl:gap-[2%] 2xl:flex-wrap'>



        {/* inputs */}
        <div className='flex flex-col mt-[20px] 2xl:mt-0 rounded-[18px] gap-[12px] 2xl:gap-[20px] p-[15px] 2xl:py-[37px] 2xl:px-[25px] bg-white w-full'>
          <div className='relative '>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={selectedInputLang === 'ru' ? 'Номер телефона' : selectedInputLang === 'uz' ? 'Telefon Raqam' : 'Phone Number'}
              className='w-full text-[#747474] rounded-[12px] focus:outline-none focus:ring-1 focus:ring-ring py-[18px] pl-[50px] px-[15px] bg-[#F8F8F8]  ' />
            <FaPhoneAlt className="absolute text-[#0129E3] left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          </div>
          <div className='relative '>
            <input
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              placeholder="Instagram"
              className='w-full text-[#747474] rounded-[12px] focus:outline-none focus:ring-1 focus:ring-ring py-[18px] pl-[50px] px-[15px] bg-[#F8F8F8]  ' />
            <div className='absolute  left-3 top-1/2 h-5 w-5 -translate-y-1/2 '>
              <Image src={Instagram} alt='Instagram link image' width={44} height={44} quality={100} className='w-full h-full object-cover ' />
            </div>


          </div>
          <div className='relative '>
            <input
              value={telegram}
              onChange={(e) => setTelegram(e.target.value)}
              placeholder='Telegram'
              className='w-full text-[#747474] rounded-[12px] focus:outline-none focus:ring-1 focus:ring-ring py-[18px] pl-[50px] px-[15px] bg-[#F8F8F8]  ' />
            <BiLogoTelegram className="absolute text-blue-500 left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          </div>
          <div className='relative '>
            <input
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
              placeholder="Facebook"
              className='w-full text-[#747474] rounded-[12px] focus:outline-none focus:ring-1 focus:ring-ring py-[18px] pl-[50px] px-[15px] bg-[#F8F8F8]  ' />
            <FaFacebookF className="absolute text-[#0077FF] left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          </div>

          <div className='relative '>
            <input
              value={youtube}
              onChange={(e) => setYoutube(e.target.value)}
              placeholder="Youtube"
              className='w-full text-[#747474] rounded-[12px] focus:outline-none focus:ring-1 focus:ring-ring py-[18px] pl-[50px] px-[15px] bg-[#F8F8F8]  ' />
            <FaYoutube className="absolute text-[#FF0302] left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          </div>






        </div>
        {/* BUTTON SAVE */}
        <div className='2xl:order-[3] mt-[25px] w-full 2xl:w-[100%] flex items-center 2xl:justify-end'>
          <button onClick={handleSave} className='bg-[#0129E3] 2xl:w-[235px] py-[20px] w-full rounded-[12px] font-medium text-center text-white'>
          {selectedInputLang === 'ru' ? 'Сохранить изменения' : selectedInputLang === 'uz' ? 'Ozgartirishlarni saqlash' : 'Save changes'}
          </button>
        </div>
      </div>

    </div>
  )
}

export default DashboardLinks
