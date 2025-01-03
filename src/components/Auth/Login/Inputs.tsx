"use client"
import { FC, useState, useEffect } from 'react';

import { useLocale } from 'next-intl';
import { GrFormPrevious } from "react-icons/gr";
import { MdOutlinePhone } from "react-icons/md";
import { TfiKey } from "react-icons/tfi";
import { Link } from '@/i18n/routing';
import { useRouter } from 'next/navigation';
import { useLoginStore } from '@/store/createLoginStore';
import { handleBack } from '@/hooks/useBack';


const RegisterForm: FC = () => {
  const { phoneNumber, password, setPassword, setPhoneNumber  , save  , success} = useLoginStore();

  const locale = useLocale();

  const router = useRouter();

  const [isFocused, setIsFocused] = useState({
    phoneNumber: false, // Ma'lumot bo'lsa true bo'ladi
    password: false,
  });

  useEffect(() => {
    setIsFocused({
      phoneNumber: !!phoneNumber,
      password: !!password,
    });
  }, [phoneNumber, password]);


  const handleFocus = (field: string, focused: boolean) => {
    setIsFocused((prev) => ({ ...prev, [field]: focused }));
  };


  if(success === true) {
    router.push(`/${locale !== 'default' ? locale : ''}/login/verify`);
  }





  const resetPassword = () => {
    router.push(`/${locale !== 'default' ? locale : ''}/login/reset-password`);
  }

  return (
    <div className='mt-[10px] slg:mt-[20px] px-[16px] slg:px-[20px] 2xl:px-[100px]'>
      <div className='flex flex-col gap-[20px] slg:gap-[16px]'>
        <div className='flex flex-row items-center mt-[15px] text-[16px] 2xl:text-[20px] text-[#0129E3] font-medium font-jost'>
          <GrFormPrevious className='2xl:w-[25px] w-[25px]  h-[25px] 2xl:h-[25px]' />
          <button onClick={handleBack}>

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
            <form autoComplete="off" className='flex flex-col gap-[15px] slg:gap-[20px]'>
              <div className="relative w-full cursor-pointer">
                <input
                  id='phoneNumber'
                  type='tel'
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  onFocus={() => handleFocus('phoneNumber', true)}
                  onBlur={() => handleFocus('phoneNumber', false)}
                  className="h-[73px] w-full rounded-2xl bg-[#F8F8F8] px-[25px] pt-[25px] outline-none drop-shadow"
                />
                <label
                  onClick={() => handleFocus('phoneNumber', true)}
                  className={`absolute  pointer-events-none left-[25px] flex items-center gap-[10px] transition-all ${isFocused['phoneNumber'] || phoneNumber ? "top-3 text-xs text-gray-500" : "top-[26px] text-base text-gray-400"
                    }`}
                >
                  <MdOutlinePhone />

                  {
                    locale === 'ru'
                      ? "Номер телефона"
                      : locale === 'uz'
                        ? "Telefon raqami"
                        : "Phone number"
                  }

                </label>
              </div>
              <div className="relative w-full cursor-pointer">
                <input
                  id='password'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => handleFocus('password', true)}
                  onBlur={() => handleFocus('password', false)}
                  className="h-[73px] w-full rounded-2xl bg-[#F8F8F8] px-[25px] pt-[25px] outline-none drop-shadow"
                />
                <label
                  onClick={() => handleFocus('password', true)}
                  className={`absolute  pointer-events-none left-[25px] flex items-center gap-[10px] transition-all ${isFocused['password'] || password ? "top-3 text-xs text-gray-500" : "top-[26px] text-base text-gray-400"
                    }`}
                >
                  <TfiKey />

                  {
                    locale === 'ru'
                      ? "Пароль"
                      : locale === 'uz'
                        ? "Parol"
                        : locale === 'fr'
                          ? "Mot de passe"
                          : "Password"
                  }

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
              <button onClick={save} className='font-medium w-full py-[20px] bg-[#0129E3] text-white rounded-[12px] '>
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
                    ? 'Ro`yhatdan otmaganmisiz ?'
                    : "Don't have an account?"
                }
                <Link href={'/register'} className='text-[#0129E3] ml-[4px]'>
                  {
                    locale === 'ru'
                      ? "Зарегистрироваться"
                      : locale === 'uz'
                        ? "Ro‘yxatdan o‘tish"
                        : "Sign up"
                  }
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default RegisterForm