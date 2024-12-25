"use client"
import { FC, useState } from 'react';

import { useLocale } from 'next-intl';
import { GrFormPrevious } from "react-icons/gr";
import { TfiKey } from "react-icons/tfi";
import { useRouter } from 'next/navigation';
import { useLoginStore } from '@/store/createLoginStore';
import { useNewPasswordStore } from '@/store/newPasswordStore';
import { SuccessModal } from '@/components/Modals/successModal';
const NewPassword: FC = () => {
  const locale = useLocale();
  const {phoneNumber} = useLoginStore();
  const {setPhoneNumber , password , setPassword , repeatPassword , setRepeatPassword , isPasswordMatch , buttonDisabled} = useNewPasswordStore();
  const router = useRouter();
  const [openModal , setOpenModal] = useState(false);
 

  const [isFocused, setIsFocused] = useState({
    password: false,
    repeatPassword: false,
  });

  const handleFocus = (field: string, focused: boolean) => {
    setIsFocused((prev) => ({ ...prev, [field]: focused }));
  };


  const handleModalSwitcher = () => setOpenModal(!openModal)


  const HandleNewPassword = () => {
      console.log("LOGIN PHONE GET" , phoneNumber)
      setPhoneNumber(phoneNumber)
      setPassword(password)
      setRepeatPassword(repeatPassword)
      router.push(`/${locale !== "default" ? locale : ""}/dashboard`);

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
              ? "Сброс пароля"
              : locale === 'uz'
                ? "Parolni o'zgartirish"
                : "Reset Password"
            }
          </h1>

          <div className='w-full slg:w-[90%] 2xl:w-[80%] mx-auto p-[15px] bg-white rounded-[20px] 2xl:p-[30px] '>
            <form className='flex flex-col gap-[15px] slg:gap-[20px]'>
             
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

                  Пароль   
                </label>
              </div>
              <div className="relative w-full cursor-pointer">
                <input
                  id='repeatPassword'
                  type='password'
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  onFocus={() => handleFocus('repeatPassword', true)}
                  onBlur={() => handleFocus('repeatPassword', false)}
                  className="h-[73px] w-full rounded-2xl bg-[#F8F8F8] px-[25px] pt-[25px] outline-none drop-shadow"
                />
                <label
                onClick={() => handleFocus('repeatPassword', true)}
                  className={`absolute  pointer-events-none left-[25px] flex items-center gap-[10px] transition-all ${isFocused['repeatPassword'] || repeatPassword ? "top-3 text-xs text-gray-500" : "top-[26px] text-base text-gray-400"
                    }`}
                >
                  <TfiKey />

                  Повторите пароль    
                </label>
              </div>
              {!isPasswordMatch && (
                <p className='text-[#D60C0C] font-medium slg:text-[16px] 2xl:text-[17px] text-[15px]'>
                  {locale === 'ru'
                    ? "пароли не совпадают"
                    : locale === 'uz'
                      ? "parolalar bir xil emas"
                      : "passwords do not match"}
                </p>
              )}
            </form>
          </div>
          <div className='grid grid-cols-1 slg:grid-cols-2 2xl:w-[80%] slg:mx-auto px-[20px] 2xl:px-0'>
            
            <div className='w-full mt-[40px] slg:flex-grow-[1] 2xl:col-span-2  slg:order-3 slg:mt-[43px]'>
              <button onClick={HandleNewPassword}  disabled={buttonDisabled} className={`font-medium w-full py-[20px] bg-[#0129E3] text-white rounded-[12px] ${buttonDisabled ? 'opacity-[60%] cursor-not-allowed' : ''} `}>
                {locale === 'ru'
                  ? "Подтвердить"
                  : locale === 'uz'
                    ? 'Tasdiqlash'
                    : "Confirm"
                }
              </button>
            </div>
            
          </div>
        </div>
      </div>
                <SuccessModal open={openModal} close={handleModalSwitcher} title={{ru: "Пароль успешно обновлен!" , uz: "" , en: ""}} subtitle={{ru: "Ваш пароль успешно обновлен" , uz: "" , en: ""}} />
    </div>
  )
}

export default NewPassword