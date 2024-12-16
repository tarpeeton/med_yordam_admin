import { useState } from "react";
import Link from "next/link";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { useLocale } from 'next-intl';


const languages = [
  { code: "en", name: "English", label: "Lang", shortName: "Eng", icon: "fi fi-gb" },
  { code: "ru", name: "Русский", label: "Язык", shortName: "Ру", icon: "fi fi-ru" },
  { code: "uz", name: "Oʻzbek", label: "Til", shortName: "Oʻz", icon: "fi fi-uz" },
];

const generateLocalizedPath = (locale: string) => {
  return `/${locale}`;
};

const LanguageSwitcher = () => {
  const [menu, setMenu] = useState(false);
  const locale = useLocale()

  const toggleDropdown = () => {
    setMenu(!menu);
  };

  const handleLocaleChange = (newLocale: string) => {
    setMenu(false);
  };

  const currentLang = languages.find(lang => lang.code === locale) || languages[0];

  return (
    <div className="relative">
      <button
        id="dropdownDefaultButton"
        className="text-black rounded-lg text-[15px] text-center inline-flex items-center gap-[8px] px-3 py-2 hover:bg-gray-50"
        type="button"
        onClick={toggleDropdown}
      >
        <span className={`fi ${currentLang.icon} w-5 h-5 rounded-sm shadow-sm`} />
        <span className={`text-[15px] font-medium ${menu ? '2xl:text-[#222E51]' : 'text-black'}`}>
          <span className="text-[#747474] text-[16px]">{currentLang.label}:</span>{" "}
          <span className="font-medium text-[16px]">{currentLang.shortName}</span>
        </span>
      </button>
      {menu && (
        <div
          id="dropdown"
          className="absolute top-full mt-1 bg-white divide-y divide-gray-100 rounded-lg shadow-lg slg:w-40 w-[120px] z-[9999] border border-gray-100"
        >
          <ul>
            {languages.map((lang) => (
              <li key={lang.code} className="text-[16px] font-medium text-gray-700">
                <Link
                  href={generateLocalizedPath(lang.code)}
                  className="px-3 py-2 hover:bg-gray-50 flex flex-row gap-2 items-center"
                  onClick={() => handleLocaleChange(lang.code)}
                >
                  <span className={`fi ${lang.icon} w-4 h-4 rounded-sm shadow-sm`} />
                  {locale === lang.code ? (
                    <span className="font-medium text-[16px]">{lang.name}</span>
                  ) : (
                    lang.name
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}


      
    </div>
  );
};

export default LanguageSwitcher;

