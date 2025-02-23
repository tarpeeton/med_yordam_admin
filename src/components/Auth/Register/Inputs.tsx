'use client';
import { FC, useState, useEffect } from 'react';

import { useLocale } from 'next-intl';
import { GrFormPrevious } from 'react-icons/gr';
import { MdOutlinePhone } from 'react-icons/md';
import { TfiKey } from 'react-icons/tfi';
import { Link } from '@/i18n/routing';
import { useRouter } from 'next/navigation';
import { useRegisterStore } from '@/store/createRegisterSlice';
import { handleBack } from '@/hooks/useBack';
import axios from 'axios';

const RegisterForm: FC = () => {
  const locale = useLocale();
  const [selectedRole, setSelectedRole] = useState<
    'ROLE_CLINIC' | 'ROLE_DOCTOR' | null
  >('ROLE_DOCTOR');

  const lng = useLocale() as 'ru' | 'uz' | 'en';
  const {
    phoneNumber,
    password,
    repeatPassword,
    isPasswordMatch,
    setPhoneNumber,
    setPassword,
    setRepeatPassword,
    resetForm,
  } = useRegisterStore();
  const router = useRouter();

  const [isFocused, setIsFocused] = useState({
    phoneNumber: false,
    password: false,
    repeatPassword: false,
  });

  useEffect(() => {
    setIsFocused({
      phoneNumber: !!phoneNumber,
      password: !!password,
      repeatPassword: !!repeatPassword,
    });
  }, [phoneNumber, password, repeatPassword]);

  const handleFocus = (field: string, focused: boolean) => {
    setIsFocused((prev) => ({ ...prev, [field]: focused }));
  };

  const handleSelectRole = (role: 'ROLE_CLINIC' | 'ROLE_DOCTOR') => {
    setSelectedRole(role);
  };

  const handleRegister = async () => {
    if (phoneNumber && password && repeatPassword && isPasswordMatch) {
      const formData = new FormData();
      formData.append('phone', phoneNumber);
      formData.append('password', password);
      formData.append('role', selectedRole || '');

      try {
        await axios.post(
          'https://medyordam.result-me.uz/api/auth/sign-up',
          formData
        );
        router.push(`/${locale !== 'default' ? locale : ''}/register/verify`);
      } catch (error) {
        alert('Registration failed. Please try again.');
      }
    } else {
      console.log('Please enter all required fields');
    }
  };

  return (
    <div className="mt-[10px] px-[16px] slg:mt-[20px] slg:px-[20px] 2xl:px-[100px]">
      <div className="flex flex-col gap-[20px] slg:gap-[16px]">
        <div className="font-jost mt-[15px] flex flex-row items-center text-[16px] font-medium text-[#0129E3] 2xl:text-[20px]">
          <GrFormPrevious className="h-[25px] w-[25px] 2xl:h-[25px] 2xl:w-[25px]" />
          <button onClick={handleBack}>
            {locale === 'ru' ? 'Назад' : locale === 'uz' ? 'Orqaga' : 'Back'}
          </button>
        </div>

        <div className="flex w-full flex-col gap-[20px] text-center slg:gap-[40px] 2xl:gap-[50px]">
          <h1 className="text-[30px] font-medium text-[#050B2B] slg:text-[40px] 2xl:text-[50px]">
            {locale === 'ru'
              ? 'Регистрация'
              : locale === 'uz'
                ? "Ro'yxatdan o'tish"
                : 'Register'}
          </h1>

          <div className="mx-auto w-full rounded-[20px] bg-white p-[15px] slg:w-[90%] 2xl:w-[80%] 2xl:p-[30px]">
            <form className="flex flex-col gap-[15px] slg:gap-[20px]">
              <div className="relative w-full cursor-pointer">
                <input
                  id="phoneNumber"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  onFocus={() => handleFocus('phoneNumber', true)}
                  onBlur={() => handleFocus('phoneNumber', false)}
                  className="h-[73px] w-full rounded-2xl bg-[#F8F8F8] px-[25px] pt-[25px] outline-none drop-shadow"
                />
                <label
                  onClick={() => handleFocus('phoneNumber', true)}
                  className={`pointer-events-none absolute left-[25px] flex items-center gap-[10px] transition-all ${
                    phoneNumber || isFocused['phoneNumber']
                      ? 'top-3 text-xs text-gray-500'
                      : 'top-[26px] text-base text-gray-400'
                  }`}
                >
                  <MdOutlinePhone />

                  {locale === 'ru'
                    ? 'Номер телефона'
                    : locale === 'uz'
                      ? 'Telefon raqamingiz'
                      : 'Phone number'}
                  <span className="text-red-500">*</span>
                </label>
              </div>
              <div className="flex w-full flex-col gap-2 text-start">
                <p className="font-medium">
                  {lng === 'ru'
                    ? 'Выберите свою роль !'
                    : lng === 'uz'
                      ? "O'z ro'lingizni tanlang !"
                      : 'Choose your role !'}
                </p>
                <div className="flex flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => handleSelectRole('ROLE_CLINIC')}
                    className={`w-[120px] rounded-lg border border-[#0129E3] py-3 font-medium 2xl:w-52 ${selectedRole === 'ROLE_CLINIC' ? 'bg-[#0129E3] text-white' : ''}`}
                  >
                    {lng === 'ru'
                      ? 'Клиника'
                      : lng === 'uz'
                        ? 'Klinika'
                        : 'Clinic'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectRole('ROLE_DOCTOR')}
                    className={`w-[120px] rounded-lg border border-[#0129E3] py-3 font-medium 2xl:w-52 ${selectedRole === 'ROLE_DOCTOR' ? 'bg-[#0129E3] text-white' : ''}`}
                  >
                    {lng === 'ru'
                      ? 'Врач'
                      : lng === 'uz'
                        ? ' Shifokor'
                        : ' Doctor'}
                  </button>
                </div>
              </div>

              <div className="relative w-full cursor-pointer">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => handleFocus('password', true)}
                  onBlur={() => handleFocus('password', false)}
                  className="h-[73px] w-full rounded-2xl bg-[#F8F8F8] px-[25px] pt-[25px] outline-none drop-shadow"
                />
                <label
                  onClick={() => handleFocus('password', true)}
                  className={`pointer-events-none absolute left-[25px] flex items-center gap-[10px] transition-all ${
                    isFocused['password'] || password
                      ? 'top-3 text-xs text-gray-500'
                      : 'top-[26px] text-base text-gray-400'
                  }`}
                >
                  <TfiKey />

                  {locale === 'ru'
                    ? 'Пароль'
                    : locale === 'uz'
                      ? 'Parol'
                      : 'Password'}
                  <span className="text-red-500">*</span>
                </label>
              </div>
              <div className="relative w-full cursor-pointer">
                <input
                  id="repeatPassword"
                  type="password"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  onFocus={() => handleFocus('repeatPassword', true)}
                  onBlur={() => handleFocus('repeatPassword', false)}
                  className={`h-[73px] w-full rounded-2xl bg-[#F8F8F8] px-[25px] pt-[25px] outline-none drop-shadow`}
                />
                <label
                  onClick={() => handleFocus('repeatPassword', true)}
                  className={`pointer-events-none absolute left-[25px] flex items-center gap-[10px] transition-all ${
                    isFocused['repeatPassword'] || repeatPassword
                      ? 'top-3 text-xs text-gray-500'
                      : 'top-[26px] text-base text-gray-400'
                  }`}
                >
                  <TfiKey />

                  {locale === 'ru'
                    ? 'Повторите пароль'
                    : locale === 'uz'
                      ? 'Parolni takrorlang'
                      : 'Repeat password'}
                  <span className="text-red-500">*</span>
                </label>
              </div>
              {!isPasswordMatch && (
                <p className="text-[15px] font-medium text-[#D60C0C] slg:text-[16px] 2xl:text-[17px]">
                  {locale === 'ru'
                    ? 'пароли не совпадают'
                    : locale === 'uz'
                      ? 'parolalar bir xil emas'
                      : 'passwords do not match'}
                </p>
              )}
            </form>
          </div>
          <div className="grid grid-cols-1 px-[20px] slg:mx-auto slg:grid-cols-2 2xl:w-[80%] 2xl:px-0">
            <div className="w-full text-left">
              <p className="text-[15px] font-medium text-[#D60C0C] slg:text-[16px] 2xl:text-[17px]">
                {locale === 'ru'
                  ? '* поля обязательные к заполнению'
                  : locale === 'uz'
                    ? "* ma'lumotlar to'ldirilishi shart"
                    : '* required fields'}
              </p>
            </div>
            <div className="mt-[40px] w-full slg:order-3 slg:mt-[43px] slg:flex-grow-[1] 2xl:col-span-2">
              <button
                onClick={handleRegister}
                className="w-full rounded-[12px] bg-[#0129E3] py-[20px] font-medium text-white"
              >
                {locale === 'ru'
                  ? 'Зарегистрироваться'
                  : locale === 'uz'
                    ? "Ro'yhatdan o'tish"
                    : 'Register'}
              </button>
            </div>
            <div className="mt-[20px] flex w-full items-center justify-center slg:order-[2] slg:mt-0 2xl:justify-end">
              <p className="text-[14px] font-medium text-[#050B2B66] text-opacity-[40%] slg:text-[16px] 2xl:text-[17px]">
                {locale === 'ru'
                  ? 'Уже есть аккаунт?'
                  : locale === 'uz'
                    ? 'Akkauntingiz bormi?'
                    : 'Already have an account?'}
                <Link href={'/login'} className="ml-[4px] text-[#0129E3]">
                  {locale === 'ru'
                    ? 'Войти'
                    : locale === 'uz'
                      ? 'Kirish'
                      : 'Login'}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
