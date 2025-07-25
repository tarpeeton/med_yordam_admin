'use client';
import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { GrFormPrevious } from 'react-icons/gr';
import { IoIosArrowDown, IoMdNotificationsOutline } from 'react-icons/io';
import 'toastr/build/toastr.min.css';
import Profile from '@/components/Dashboard/Profile';
import DashboardLinks from '@/components/Dashboard/Links';
import DashboardProInfo from '@/components/Dashboard/ProInfo';
import DashboardServices from '@/components/Dashboard/Services';
import DashboardSecurity from '@/components/Dashboard/Password';
import DashboardFiles from '@/components/Dashboard/Files';
import DashboardAddress from '@/components/Dashboard/Adress';
import ApplicationMessage from '@/components/Dashboard/Application';

interface SelectedInterface {
  ru: string;
  uz: string;
  en: string;
}

const options = [
  { ru: 'Профиль', uz: 'Profil', en: 'Profile' },
  { ru: 'Контакты', uz: 'Kontaktlar', en: 'Contacts' },
  { ru: 'Профинформация', uz: 'Profinformatsiya', en: 'Profile Info' },
  { ru: 'Место приема', uz: 'Qabul joyi', en: 'Reception Place' },
  {
    ru: 'Услуги и цены',
    uz: 'Xizmatlar va narxlar',
    en: 'Services and Prices',
  },
  { ru: 'Документы', uz: 'Hujjatlar', en: 'Documents' },
  { ru: 'Безопасность', uz: 'Xavfsizlik', en: 'Security' },
  {
    ru: 'Заявка',
    uz: 'Zayafkalar',
    en: 'Notifications',
    icon: <IoMdNotificationsOutline size={25} />,
  },
];

const DashboardSwitchers = () => {
  const locale = useLocale() as 'ru' | 'uz' | 'en';
  const [selectedLanguage, setSelectedLanguage] = useState<'ru' | 'uz' | 'en'>(
    locale
  );

  const [selectedPage, setSelectedPage] = useState<SelectedInterface>(
    options[0]
  );

  const [open, setOpen] = useState(false);

  const HandleChangeOpen = () => setOpen(!open);

  const handleSelect = (option: SelectedInterface) => {
    setSelectedPage(option);
    setOpen(false);
  };

  useEffect(() => {
    // Update selectedPage when locale changes
    setSelectedPage((prevPage) => ({
      ...prevPage,
      [locale]: prevPage[locale],
    }));
  }, [locale]);

  return (
    <section>
      <div className="flex flex-row items-center justify-between">
        <div className="font-jost flex flex-row items-center text-[14px] font-medium text-[#0129E3] 2xl:text-[20px]">
          <GrFormPrevious className="h-[25px] w-[25px] 2xl:h-[25px] 2xl:w-[25px]" />
          <button>
            {locale === 'ru' ? 'Назад' : locale === 'uz' ? 'Orqaga' : 'Back'}
          </button>
        </div>
        <div className="flex flex-row items-center gap-[4px]">
          <button
            onClick={() => setSelectedLanguage('ru')}
            className={`font-jost h-[24px] w-[32px] rounded-bl-[10px] rounded-tl-[10px] text-[14px] font-medium 2xl:h-[42px] 2xl:w-[48px] 2xl:text-[20px] ${selectedLanguage === 'ru' ? 'bg-[#0129E3] text-white' : 'bg-white text-[#050B2B]'}`}
          >
            Ru
          </button>
          <button
            onClick={() => setSelectedLanguage('uz')}
            className={`font-jost h-[24px] w-[32px] text-[14px] font-medium 2xl:h-[42px] 2xl:w-[48px] 2xl:text-[20px] ${selectedLanguage === 'uz' ? 'bg-[#0129E3] text-white' : 'bg-white text-[#050B2B]'}`}
          >
            Uz
          </button>
          <button
            onClick={() => setSelectedLanguage('en')}
            className={`font-jost h-[24px] w-[32px] rounded-br-[10px] rounded-tr-[10px] text-[14px] font-medium 2xl:h-[42px] 2xl:w-[48px] 2xl:text-[20px] ${selectedLanguage === 'en' ? 'bg-[#0129E3] text-white' : 'bg-white text-[#050B2B]'}`}
          >
            Eng
          </button>
        </div>
      </div>
      <div className="mt-[20px] 2xl:mt-[18px] 2xl:hidden">
        <button
          className="flex w-full flex-row items-center justify-between rounded-[8px] bg-[#0129E31A] bg-opacity-[10%] px-[20px] py-[15px]"
          onClick={HandleChangeOpen}
          aria-label="select page for update"
        >
          <p className="text-[18px] font-medium text-[#0129E3]">
            {selectedPage[locale]}
          </p>
          <IoIosArrowDown
            className={`h-[25px] w-[25px] text-[#0129E3] 2xl:h-[25px] 2xl:w-[25px] ${open ? 'rotate-180 transition-all duration-300 ease-in-out' : 'duration-300 ease-in-out'}`}
          />
        </button>

        {open && (
          <div
            className={`mt-[10px] transform rounded-[12px] bg-white p-[10px] shadow-lg transition-all duration-300 ease-in-out`}
          >
            <ul>
              {options.map((option, index) => (
                <li
                  key={index}
                  className="cursor-pointer rounded-[5px] px-[15px] py-[20px] text-[15px] font-semibold text-[#747474] hover:bg-[#f0f0f0]"
                  onClick={() => handleSelect(option)}
                >
                  {option[locale]}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {/* DESKTOP */}
      <div className="mt-[20px] hidden w-full 2xl:block">
        <div className="inline-block w-full border-b border-b-[#EDEDED]">
          <div className="grid w-full grid-cols-[repeat(7,_1fr)_minmax(0,_90px)]">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(option)}
                className={`font-jost relative flex items-center justify-center py-[20px] text-center text-[16px] font-medium text-[#050B2B] ${selectedPage[locale] === option[locale] ? 'rounded-tl-[10px] rounded-tr-[10px] bg-[#0129E3] text-white' : 'bg-white text-[#050B2B]'}`}
              >
                <span
                  className={`absolute right-0 top-1/2 h-[30px] w-[1px] -translate-y-1/2 transform ${selectedPage[locale] === option[locale] ? 'bg-[#0129E3]' : 'bg-[#EDEDED]'} `}
                ></span>
                {option.icon ? option.icon : option[locale]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {selectedPage.en === 'Profile' && (
        <Profile selectedInputLang={selectedLanguage} />
      )}
      {selectedPage.en === 'Contacts' && (
        <DashboardLinks selectedInputLang={selectedLanguage} />
      )}
      {selectedPage.en === 'Profile Info' && (
        <DashboardProInfo selectedInputLang={selectedLanguage} />
      )}
      {selectedPage.en === 'Services and Prices' && (
        <DashboardServices selectedInputLang={selectedLanguage} />
      )}
      {selectedPage.en === 'Security' && (
        <DashboardSecurity selectedInputLang={selectedLanguage} />
      )}
      {selectedPage.en === 'Documents' && (
        <DashboardFiles selectedInputLang={selectedLanguage} />
      )}
      {selectedPage.en === 'Reception Place' && (
        <DashboardAddress selectedInputLang={selectedLanguage} />
      )}
      {selectedPage.en === 'Notifications' && <ApplicationMessage />}
    </section>
  );
};

export default DashboardSwitchers;
