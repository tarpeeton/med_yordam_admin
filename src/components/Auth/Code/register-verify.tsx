'use client';
import { FC, useState, useEffect } from 'react';

import { useLocale } from 'next-intl';
import { GrFormPrevious } from 'react-icons/gr';
import { Link } from '@/i18n/routing';
import { SuccessModal } from '@/components/Modals/successModal';
import { ErrorModal } from '@/components/Modals/errorModal';
import { useRegisterStore } from '@/store/createRegisterSlice';

const RegisterCodeVerify: FC = () => {
  const locale = useLocale() as 'ru' | 'uz' | 'en';
  const [isResendVisible, setIsResendVisible] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const { registerVerifyCode, setRegisterCode, buttonDisabled } =
    useRegisterStore();

  const [timer, setTimer] = useState(60);

  const HandleSuccessModalSwitcher = () =>
    setSuccessModalOpen(!successModalOpen);
  const HandleErrorModalSwitcher = () => setErrorModalOpen(!errorModalOpen);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setIsResendVisible(true);
    }
  }, [timer]);

  const handleResendCode = () => {
    setTimer(60);
    setIsResendVisible(false);
  };

  const handleConfirm = () => {
    try {
      setSuccessModalOpen(true);
    } catch (error) {
      setErrorModalOpen(true);
    }
  };

  return (
    <div className="mt-[10px] px-[16px] slg:mt-[20px] slg:px-[20px] 2xl:px-[100px]">
      <div className="flex flex-col gap-[20px] slg:gap-[16px]">
        <div className="font-jost mt-[15px] flex flex-row items-center text-[16px] font-medium text-[#0129E3] 2xl:text-[20px]">
          <GrFormPrevious className="h-[25px] w-[25px] 2xl:h-[25px] 2xl:w-[25px]" />
          <button>
            {locale === 'ru' ? 'Назад' : locale === 'uz' ? 'Orqaga' : 'Back'}
          </button>
        </div>

        <div className="flex w-full flex-col gap-[20px] text-center slg:gap-[40px] 2xl:gap-[50px]">
          <h1 className="mx-auto w-[98%] text-[25px] font-medium text-[#050B2B] slg:mx-auto slg:w-[70%] slg:text-[40px] 2xl:w-[65%] 2xl:text-[50px] 3xl:w-[50%] 4xl:w-[40%]">
            На ваш номер отправлено письмо с подтверждением
          </h1>
          {/* <Modal open={isModalOpen} close={handleCloseModal} /> */}
          <div className="mx-auto w-full rounded-[20px] bg-white p-[15px] slg:w-[90%] 2xl:w-[80%] 2xl:p-[30px]">
            <form className="flex flex-col gap-[15px] slg:gap-[20px]">
              <p className="text-[14px] font-medium text-[#050B2B] slg:text-[16px] 2xl:text-[20px]">
                {locale === 'ru'
                  ? 'Пожалуйста, введите код из СМС сообщения'
                  : locale === 'uz'
                    ? 'Iltimos , raqamingizga yuborilgan tasdiqlash kodingizni kiriting'
                    : 'Please enter the code from the SMS message'}
              </p>
              <div className="relative w-full cursor-pointer">
                <input
                  id="code"
                  type="tel"
                  maxLength={6}
                  value={registerVerifyCode}
                  onChange={(e) => setRegisterCode(e.target.value)}
                  placeholder={
                    locale === 'ru' ? 'Код' : locale === 'uz' ? 'Kod' : 'Code'
                  }
                  className="relative h-[73px] w-full rounded-2xl bg-[#F8F8F8] px-[25px] outline-none drop-shadow"
                />
                <label
                  className={`text-gray-400"} absolute left-[25px] top-[26px] flex w-[calc(100%-50px)] items-center justify-end gap-[10px] text-xs text-gray-500 transition-all`}
                >
                  <div>
                    {isResendVisible ? (
                      <button
                        onClick={handleResendCode}
                        type="button"
                        className="cursor-pointer text-[15px] font-bold text-[#0129E3]"
                      >
                        Отправить еще раз
                      </button>
                    ) : (
                      <p className="text-[15px] font-bold text-[#0129E3]">
                        {`00:${String(timer).padStart(2, '0')}`}
                      </p>
                    )}
                  </div>
                </label>
              </div>
              <div className="flex flex-row items-center">
                <Link
                  href={`/register`}
                  className="text-left text-[14px] font-medium text-[#0129E3] slg:text-[15px] 2xl:text-[16px]"
                >
                  {locale === 'ru'
                    ? 'Изменить номер телефона'
                    : locale === 'uz'
                      ? "Raqamni o'zgartirish"
                      : 'Change phone number'}
                </Link>
              </div>
            </form>
          </div>
          <div className="mx-auto mt-[40px] w-full slg:mt-[43px] slg:w-[90%] 2xl:w-[80%]">
            <button
              disabled={buttonDisabled}
              onClick={handleConfirm}
              className={`w-full rounded-[12px] bg-[#0129E3] py-[20px] font-medium text-white slg:w-[90%] 2xl:min-w-full ${buttonDisabled ? 'cursor-not-allowed opacity-[60%]' : ''} `}
            >
              {locale === 'ru'
                ? 'Подтвердить'
                : locale === 'uz'
                  ? 'Tasdiqlash'
                  : 'Confirm'}
            </button>
          </div>
        </div>
      </div>
      <SuccessModal
        title={{
          ru: 'Регистрация прошла успешно!',
          uz: "Ro'yxatdan o'tish muvaffaqiyatli yakunlandi!",
          en: 'Registration was successful!',
        }}
        subtitle={{
          ru: 'Поздравляем, вы успешно зарегистрировались. Добро пожаловать!',
          uz: "Tabriklaymiz, siz muvaffaqiyatli ro'yxatdan o'tdingiz. Xush kelibsiz!",
          en: 'Congratulations, you have successfully registered. Welcome!',
        }}
        open={successModalOpen}
        close={HandleSuccessModalSwitcher}
      />
      <ErrorModal
        linkToRouter="register"
        title={{
          ru: 'Ошибка регистрации',
          uz: "Ro'yxatdan o'tishda Xatolik",
          en: 'Registration error',
        }}
        subtitle={{
          ru: 'К сожалению, произошла ошибка при регистрации. Пожалуйста, попробуйте снова',
          uz: "Afsuski, ro'yxatdan o'tishda xatolik yuz berdi. Iltimos, yana urinib ko'ring",
          en: 'Unfortunately, an error occurred during registration. Please try again.',
        }}
        open={errorModalOpen}
        close={HandleErrorModalSwitcher}
      />
    </div>
  );
};

export default RegisterCodeVerify;
