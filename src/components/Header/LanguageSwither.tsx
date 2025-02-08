import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import '/node_modules/flag-icons/css/flag-icons.min.css';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { generateLocalizedPath } from '@/hooks/generateLocalizedPath';
import { IoIosArrowDown } from 'react-icons/io';

const languages = [
  {
    code: 'en',
    name: 'English',
    label: 'Lang',
    shortName: 'Eng',
    icon: 'fi fi-gb',
  },
  {
    code: 'ru',
    name: 'Русский',
    label: 'Язык',
    shortName: 'Ру',
    icon: 'fi fi-ru',
  },
  {
    code: 'uz',
    name: 'Oʻzbek',
    label: 'Til',
    shortName: 'Oʻz',
    icon: 'fi fi-uz',
  },
];

const LanguageSwitcher = () => {
  const [menu, setMenu] = useState(false);
  const locale = useLocale();
  const pathname = usePathname(); // Get the current path
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setMenu((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const currentLang =
    languages.find((lang) => lang.code === locale) || languages[0];

  return (
    <div className="relative" ref={menuRef}>
      <button
        id="dropdownDefaultButton"
        className="group flex h-12 w-24 flex-row items-center justify-center gap-2 rounded-full border border-MyBlue font-bold text-MyBlue"
        type="button"
        onClick={toggleDropdown}
      >
        <span className="text-[16px] font-medium">{currentLang.shortName}</span>
        <IoIosArrowDown
          className={`mt-1 transition-all duration-150 ${menu ? 'rotate-180' : ''}`}
        />
      </button>
      {menu && (
        <div
          id="dropdown"
          onMouseLeave={() => setMenu(false)}
          className="absolute top-full z-[9999] mt-1 w-[120px] divide-y divide-gray-100 rounded-lg border border-gray-100 bg-white shadow-lg slg:w-40 2xl:w-32"
        >
          <ul>
            {languages.map((lang) => (
              <li
                key={lang.code}
                className="text-[16px] font-medium text-gray-700"
              >
                <Link
                  href={generateLocalizedPath(lang.code || '', pathname)}
                  className="flex flex-row items-center gap-2 px-3 py-2 hover:bg-gray-50"
                >
                  <span
                    className={`fi ${lang.icon} h-4 w-4 rounded-sm shadow-sm`}
                  />
                  {locale === lang.code ? (
                    <span className="text-[16px] font-medium">{lang.name}</span>
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
