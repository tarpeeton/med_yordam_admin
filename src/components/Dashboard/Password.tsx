"use client"
import { FC, useState } from 'react';
import { TfiKey } from "react-icons/tfi";
import { useSecurityStore } from '@/store/createSeucurity';
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { useLocale } from 'next-intl';

interface ISecurityProps {
  selectedInputLang: "ru" | "uz" | "en";
}


const DashboardSecurity: FC<ISecurityProps> = ({ selectedInputLang }) => {
  const { setNewPassword, save, setOldPassword, setRepeatPassword, newPassword, repeatPassword, oldPassword, success, error, isPasswordMatch, } = useSecurityStore()
  const locale = useLocale()

  const [isFocused, setIsFocused] = useState({
    oldPassword: false,
    newPassword: false,
    repeatPassword: false,
  });

  const handleFocus = (field: string, focused: boolean) => {
    setIsFocused((prev) => ({ ...prev, [field]: focused }));
  };


  const SaveChanges = async () => {
    const success = await save();
    const message =
      locale === "ru"
        ? success
          ? "успешно изменён!"
          : "Текущий пароль не совпадает!"
        : locale === "uz"
          ? success
            ? "muvaffaqiyatli ozgartirildi!"
            : "Hozirgi parol mos emas!"
          : success
            ? "Password changed successfully!"
            : "The current password does not match!";

    toastr[success ? "success" : "error"](message);
  }



  return (
    <div>

      <div className='w-full'>
        <form className='flex rounded-bl-[18px] rounded-br-[18px] bg-white py-[25px] 2xl:px-[25px] 2xl:py-[37px]  flex-col gap-[15px] slg:gap-[20px] p-[15px] '>

          <div className="relative w-full cursor-pointer">
            <input
              id='oldPassword'
              type='password'
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              onFocus={() => handleFocus('oldPassword', true)}
              onBlur={() => handleFocus('oldPassword', false)}
              className="h-[73px] w-full rounded-2xl bg-[#F8F8F8] px-[25px] pt-[25px] outline-none drop-shadow"
            />
            <label
              onClick={() => handleFocus('oldPassword', true)}
              className={`absolute  pointer-events-none left-[25px] flex items-center gap-[10px] transition-all ${isFocused['oldPassword'] || oldPassword ? "top-3 text-xs text-gray-500" : "top-[26px] text-base text-gray-400"
                }`}
            >
              <TfiKey />


              {selectedInputLang === 'ru' ? "Текущий пароль" : selectedInputLang === 'uz' ? "Hozirgi parol" : "Current password"}
            </label>
          </div>
          <div className="relative w-full cursor-pointer">
            <input
              id='newPassword'
              type='password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              onFocus={() => handleFocus('newPassword', true)}
              onBlur={() => handleFocus('newPassword', false)}
              className="h-[73px] w-full rounded-2xl bg-[#F8F8F8] px-[25px] pt-[25px] outline-none drop-shadow"
            />
            <label
              onClick={() => handleFocus('newPassword', true)}
              className={`absolute  pointer-events-none left-[25px] flex items-center gap-[10px] transition-all ${isFocused['newPassword'] || newPassword ? "top-3 text-xs text-gray-500" : "top-[26px] text-base text-gray-400"
                }`}
            >
              <TfiKey />

              {
                selectedInputLang === 'ru'
                  ? "Новый пароль"
                  : selectedInputLang === 'uz'
                    ? "Yangi parol"
                    : "New password"
              }

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

              {selectedInputLang === 'ru'
                ? "Повторите пароль"
                : selectedInputLang === 'uz'
                  ? "Parolni takrorlang"
                  : "Repeat password"}
            </label>
          </div>
          {!isPasswordMatch && (
            <p className='text-[#D60C0C] font-medium slg:text-[16px] 2xl:text-[17px] text-[15px]'>
              {selectedInputLang === 'ru'
                ? "пароли не совпадают"
                : selectedInputLang === 'uz'
                  ? "parolalar bir xil emas"
                  : "passwords do not match"}
            </p>
          )}
        </form>
        <div className='2xl:order-[3] mt-[25px] w-full 2xl:w-[100%] flex items-center 2xl:justify-end'>
          <button onClick={SaveChanges} className='bg-[#0129E3] 2xl:w-[235px] py-[20px] w-full rounded-[12px] font-medium text-center text-white'>
            {selectedInputLang === 'ru' ? 'Сохранить изменения' : selectedInputLang === 'uz' ? 'Ozgartirishlarni saqlash' : 'Save changes'}
          </button>
        </div>
      </div>

    </div>
  )
}

export default DashboardSecurity