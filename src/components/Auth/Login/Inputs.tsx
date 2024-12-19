"use client"
import { FC, useState, useEffect } from 'react';

import { useLocale } from 'next-intl';
import { GrFormPrevious } from "react-icons/gr";
import { MdOutlinePhone } from "react-icons/md";
import { TfiKey } from "react-icons/tfi";
import { Link } from '@/i18n/routing';
import Axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const RegisterForm: FC = () => {
  const locale = useLocale();

  const router = useRouter();

  const [formValues, setFormValues] = useState({
    phoneNumber: '',
    password: '',
  });

  const [isFocused, setIsFocused] = useState({
    phoneNumber: false,
    password: false,
  });

  const handleFocus = (field: string, focused: boolean) => {
    setIsFocused((prev) => ({ ...prev, [field]: focused }));
  };

  useEffect(() => {
    if (formValues.phoneNumber) Cookies.set('phoneNumber', formValues.phoneNumber, { expires: 7 });
    if (formValues.password) Cookies.set('password', formValues.password, { expires: 7 });
  }, [formValues.phoneNumber, formValues.password]);

  useEffect(() => {
    setFormValues({
      phoneNumber: Cookies.get('phoneNumber') || '',
      password: Cookies.get('password') || '',
    });
  }, []);


  const handlePhoneNumberChange = (value: string) => {
    // Regex to allow only +, digits, and spaces
    const regex = /^\+?[\d ]*$/;
    if (regex.test(value)) {
      setFormValues((prev) => ({ ...prev, phoneNumber: value }));
    }
  };



  const handleLogin = () => {
    if (formValues.phoneNumber && formValues.password) {
      Cookies.set('phoneNumber', formValues.phoneNumber, { expires: 1 });
      Cookies.set('password', formValues.password, { expires: 1 });
      router.push(`/${locale !== 'default' ? locale : ''}/login/verify`);

    } else {
      alert('Please enter all required fields');
    }
  };


 

  const resetPassword = () => {
    router.push(`/${locale !== 'default' ? locale : ''}/login/reset-password`);
  }

  return (
    <div className='mt-[10px] slg:mt-[20px] px-[16px] slg:px-[20px] 2xl:px-[100px]'>
      <div className='flex flex-col gap-[20px] slg:gap-[16px]'>
        <div className='flex flex-row items-center mt-[15px] text-[16px] 2xl:text-[20px] text-[#0129E3] font-medium font-jost'>
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

        <div className='flex flex-col gap-[20px] slg:gap-[40px] 2xl:gap-[50px] w-full text-center '>
          <h1 className='text-[30px] font-medium text-[#050B2B] slg:text-[40px] 2xl:text-[50px]'>
            {locale === 'ru'
              ? "Авторизация"
              : locale === 'uz'
                ? "Kirish"
                : "Login"
            }
          </h1>

          <div className='w-full slg:w-[90%] 2xl:w-[80%] mx-auto p-[15px] bg-white rounded-[20px] 2xl:p-[30px] '>
            <form className='flex flex-col gap-[15px] slg:gap-[20px]'>
              <div className="relative w-full cursor-pointer">
                <input
                  id='phoneNumber'
                  type='tel'
                  value={formValues.phoneNumber}
                  onChange={(e) => handlePhoneNumberChange(e.target.value)}
                  onFocus={() => handleFocus('phoneNumber', true)}
                  onBlur={() => handleFocus('phoneNumber', false)}
                  className="h-[73px] w-full rounded-2xl bg-[#F8F8F8] px-[25px] pt-[25px] outline-none drop-shadow"
                />
                <label
                onClick={() => handleFocus('phoneNumber', true)}
                  className={`absolute  pointer-events-none left-[25px] flex items-center gap-[10px] transition-all ${isFocused['phoneNumber'] || formValues['phoneNumber'] ? "top-3 text-xs text-gray-500" : "top-[26px] text-base text-gray-400"
                    }`}
                >
                  <MdOutlinePhone />

                  Номер телефона 
                </label>
              </div>
              <div className="relative w-full cursor-pointer">
                <input
                  id='password'
                  type='password'
                  value={formValues.password}
                  onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
                  onFocus={() => handleFocus('password', true)}
                  onBlur={() => handleFocus('password', false)}
                  className="h-[73px] w-full rounded-2xl bg-[#F8F8F8] px-[25px] pt-[25px] outline-none drop-shadow"
                />
                <label
                onClick={() => handleFocus('password', true)}
                  className={`absolute  pointer-events-none left-[25px] flex items-center gap-[10px] transition-all ${isFocused['password'] || formValues['password'] ? "top-3 text-xs text-gray-500" : "top-[26px] text-base text-gray-400"
                    }`}
                >
                  <TfiKey />

                  Пароль   
                </label>
              </div>
            </form>
          </div>
          <div className='grid grid-cols-1 2xl:mt-[-50px] slg:grid-cols-2 2xl:w-[80%] slg:mx-auto px-[20px] 2xl:px-0'>
            <div className='w-full text-left '>
              <button onClick={resetPassword} className='text-[#0129E3] font-medium slg:text-[16px] 2xl:text-[17px] text-[15px]'>
                {locale === 'ru'
                  ? "Забыли пароль ?"
                  : locale === 'uz'
                    ? "Parolni unutdingizmi ?"
                    : "Forgot password ?"
                }
              </button>
            </div>
            <div className='w-full mt-[40px] slg:flex-grow-[1] 2xl:col-span-2 slg:order-3 slg:mt-[43px]'>
              <button onClick={handleLogin} className='font-medium w-full py-[20px] bg-[#0129E3] text-white rounded-[12px] '>
                {locale === 'ru'
                  ? "Войти"
                  : locale === 'uz'
                    ? 'Kirish'
                    : "Login"
                }
              </button>
            </div>
            <div className='mt-[20px] w-full  slg:order-[2] flex items-center justify-center slg:mt-0 2xl:justify-end'>
              <p className='text-[#050B2B66] text-opacity-[40%] font-medium slg:text-[16px] 2xl:text-[17px] text-[14px]'>
                {locale === 'ru'
                  ? "Нет аккаунта? "
                  : locale === 'uz'
                    ?'Ro`yhatdan otmaganmisiz ?'
                    : "Don't have an account?"
                }
                <Link href={'/register'} className='text-[#0129E3] ml-[4px]'>Зарегестрироваться</Link>
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default RegisterForm