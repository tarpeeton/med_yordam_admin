"use client"
import { FC, useState, useEffect } from 'react';

import { useLocale } from 'next-intl';
import { GrFormPrevious } from "react-icons/gr";
import Axios from 'axios';
import { Link } from '@/i18n/routing';
import { Modal } from '@/components/Modals/successModal';
import { ErrorModal } from '@/components/Modals/errorModal';


const RegisterCode: FC = () => {
  const locale = useLocale();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isResendVisible, setIsResendVisible] = useState(false);

  const [formValues, setFormValues] = useState({
    code: '',
  });

  const [isFocused, setIsFocused] = useState({
    code: false,
  });




  const handleFocus = (field: string, focused: boolean) => {
    setIsFocused((prev) => ({ ...prev, [field]: focused }));
  };

  const handleCodeChange = (value: string) => {
    // Regex to allow only +, digits, and spaces
    const regex = /^[\d ]*$/;
    if (regex.test(value) && value.length <= 6) {
      setFormValues((prev) => ({ ...prev, code: value }));
    }
  };


  const handleCloseModal = () =>  setIsModalOpen(false)

  const [timer, setTimer] = useState(60);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
  
      return () => clearInterval(interval); // Cleanup interval
    } else {
      setIsResendVisible(true); // When timer is 0, show resend button
    }
  }, [timer]);
  



  const handleResendCode = () => {
    setTimer(60); // Reset the timer
    setIsResendVisible(false); // Hide the resend button
    // Call API to resend code here
    console.log('Code resent');
  };




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
          <h1 className='text-[25px] font-medium text-[#050B2B] slg:text-[40px] 2xl:text-[50px] w-[98%] mx-auto slg:w-[70%] 2xl:w-[65%] 3xl:w-[50%] slg:mx-auto 4xl:w-[40%] '>
            {locale === 'ru'
              ? "На ваш номер отправлено письмо с подтверждением"
              : locale === 'uz'
                ? "Raqamingizga tasdiqlash kodi yuborildi"
                : "Confirmation letter sent to your number"
            }
          </h1>
            {/* <Modal open={isModalOpen} close={handleCloseModal} /> */}
            <ErrorModal open={isModalOpen} close={handleCloseModal} />
          <div className='w-full slg:w-[90%] 2xl:w-[80%] mx-auto p-[15px] bg-white rounded-[20px] 2xl:p-[30px] '>
            <form className='flex flex-col gap-[15px] slg:gap-[20px]'>
              <p className='text-[14px] slg:text-[16px] text-[#050B2B] 2xl:text-[20px] font-medium'>
                {locale === 'ru' ? "Пожалуйста, введите код из СМС сообщения" : locale === 'uz' ? "Iltimos , raqamingizga yuborilgan tasdiqlash kodingizni kiriting" : "Please enter the code from the SMS message"}
              </p>
              <div className="relative w-full cursor-pointer">
                <input
                  id='code'
                  type='tel'
                  value={formValues.code}
                  onChange={(e) => handleCodeChange(e.target.value)}
                  onFocus={() => handleFocus('code', true)}
                  onBlur={() => handleFocus('code', false)}
                  className="h-[73px] w-full rounded-2xl bg-[#F8F8F8] px-[25px] pt-[25px] outline-none drop-shadow relative"
                />
                <label
                  onClick={() => handleFocus('code', true)}
                  className={`absolute left-[25px] pointer-events-none w-[calc(100%-50px)] flex items-center justify-between gap-[10px] transition-all ${isFocused['code'] || formValues['code'] ? "top-3 text-xs text-gray-500" : "top-[26px] text-base text-gray-400"
                    }`}
                >

                  {locale === 'ru' ? "Код подтверждения" : locale === 'uz' ? "Tasdiqlash kodi" : "Confirmation code"}

                  <div>
                    {isResendVisible ? (
                  <button
                    onClick={handleResendCode}
                    type="button"
                    className="text-[15px] text-[#0129E3] font-bold cursor-pointer"
                  >
                    Отправить еще раз
                  </button>
                ) : (
                  <p className="text-[15px] text-[#0129E3] font-bold">
                    {`00:${String(timer).padStart(2, '0')}`}
                  </p>
                )}

                  </div>
                </label>
              </div>
              <div className='flex flex-row  items-center'>
                <Link href='/register' className='text-[14px] slg:text-[15px] text-[#0129E3] 2xl:text-[16px] font-medium text-left'>
                  {locale === 'ru' ? "Изменить номер телефона" : locale === 'uz' ? "Raqamni o'zgartirish" : "Change phone number"}
                </Link>
               
              </div>

            </form>
          </div>
          <div className='w-full mt-[40px] mx-auto  slg:w-[90%] 2xl:w-[80%]   slg:mt-[43px]'>
            <button className='font-medium w-full py-[20px] bg-[#0129E3] text-white rounded-[12px] slg:w-[90%] 2xl:min-w-full'>
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
  )
}

export default RegisterCode