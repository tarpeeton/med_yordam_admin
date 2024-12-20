"use client";

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { GrFormPrevious } from "react-icons/gr";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import Profile from '@/components/Dashboard/Profile';


interface SelectedInterface {
  ru: string,
  uz: string,
  en: string
}

const options = [
  { ru: "Профиль", uz: "Profil", en: "Profile" },
  { ru: "Контакты", uz: "Kontaktlar", en: "Contacts" },
  { ru: "Профинформация", uz: "Profinformatsiya", en: "Profile Info" },
  { ru: "Место приема", uz: "Qabul joyi", en: "Reception Place" },
  { ru: "Услуги и цены", uz: "Xizmatlar va narxlar", en: "Services and Prices" },
  { ru: "Документы", uz: "Hujjatlar", en: "Documents" },
  { ru: "Безопасность", uz: "Xavfsizlik", en: "Security" },
];


const DashboardSwitchers = () => {
  const locale = useLocale() as 'ru' | 'uz' | 'en'
  const [selectedLanguage, setSelectedLanguage] = useState<'ru' | 'uz' | 'en'>('ru');

  const [selectedPage, setSelectedPage] = useState<SelectedInterface>({
    ru: 'Профиль',
    uz: 'Profil',
    en: 'profile'
  })



  const [open, setOpen] = useState(false)


  const HandleChangeOpen = () => setOpen(!open)

  const handleSelect = (option: SelectedInterface) => {
    setSelectedPage(option);
    setOpen(false);
  };

  return (
    <section>
      <div className='flex flex-row justify-between items-center'>
        <div className='flex flex-row items-center  text-[14px] 2xl:text-[20px] text-[#0129E3] font-medium font-jost'>
          <GrFormPrevious className='2xl:w-[25px] w-[25px]  h-[25px] 2xl:h-[25px]' />
          <button>

            {locale === 'ru'
              ? "Назад"
              : locale === 'uz'
                ? "Orqaga"
                : "Back"
            }

          </button>
        </div>
        <div className='flex flex-row items-center gap-[4px]'>
          <button onClick={() => setSelectedLanguage('ru')} className={`text-[14px]  w-[32px] h-[24px] 2xl:w-[48px] 2xl:h-[42px] rounded-tl-[10px] rounded-bl-[10px] 2xl:text-[20px]   font-medium font-jost ${selectedLanguage === 'ru' ? 'bg-[#0129E3] text-white' : 'bg-white text-[#050B2B]'}`}>
            Ru
          </button>
          <button onClick={() => setSelectedLanguage('uz')} className={`text-[14px]  w-[32px] h-[24px] 2xl:w-[48px] 2xl:h-[42px]  2xl:text-[20px]  font-medium font-jost ${selectedLanguage === 'uz' ? 'bg-[#0129E3] text-white' : 'bg-white text-[#050B2B]'}`}>
            Uz
          </button>
          <button onClick={() => setSelectedLanguage('en')} className={`text-[14px]  w-[32px] h-[24px] 2xl:w-[48px] 2xl:h-[42px] rounded-tr-[10px] rounded-br-[10px] 2xl:text-[20px] font-medium font-jost ${selectedLanguage === 'en' ? 'bg-[#0129E3] text-white' : 'bg-white text-[#050B2B]'}`}>
            Eng
          </button>
        </div>
      </div>
      <div className='mt-[20px] 2xl:mt-[18px] 2xl:hidden'>
        <button className='flex flex-row w-full py-[15px] px-[20px]  rounded-[8px] bg-[#0129E31A] bg-opacity-[10%] justify-between items-center ' onClick={HandleChangeOpen} aria-label='select page for update'>
          <p className='text-[#0129E3] font-medium text-[18px]'>{selectedPage[locale]}</p>
          <IoIosArrowDown className={`2xl:w-[25px] w-[25px] text-[#0129E3] h-[25px] 2xl:h-[25px] ${open ? 'rotate-180 transition-all duration-300 ease-in-out' : 'duration-300 ease-in-out'}`} />
        </button>

        {open && (
          <div
            className={`bg-white rounded-[12px] mt-[10px] p-[10px] shadow-lg transition-all duration-300 ease-in-out transform `}
          >
            <ul>
              {options.map((option, index) => (
                <li
                  key={index}
                  className="py-[20px] font-semibold px-[15px] text-[#747474] text-[15px] hover:bg-[#f0f0f0] cursor-pointer rounded-[5px]"
                  onClick={() => handleSelect(option)}
                >
                  {option[locale]}
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
      <div className='hidden 2xl:block mt-[20px] w-full'>
        <div className='inline-block border-b border-b-[#EDEDED] w-full'>
          <div className='grid grid-cols-7 w-full'>
            {options.map((option, index) => (
              <button key={index} onClick={() => handleSelect(option)} className={`text-[20px] relative py-[20px] text-center text-[#050B2B] font-medium font-jost ${selectedPage[locale] === option[locale] ? 'bg-[#0129E3] text-white rounded-tl-[10px] rounded-tr-[10px]' : 'bg-white text-[#050B2B]'}`}>
                <span
                  className={`absolute right-0 top-1/2 transform -translate-y-1/2 h-[30px] w-[1px]  ${selectedPage[locale] === option[locale] ? 'bg-[#0129E3]' : 'bg-[#EDEDED]'} `}
                ></span>
                {option[locale]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {selectedPage.en === 'profile' && (<Profile selectedInputLang={selectedLanguage} />)}


    </section>
  )
}

export default DashboardSwitchers
