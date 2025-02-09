'use client';
import { useState } from 'react';
import { TfiKey } from 'react-icons/tfi';
import { useSecurityStore } from '@/store/createSeucurity';
import toastr from 'toastr';
import { useLocale } from 'next-intl';

import { ILangTopProps } from '@/interface/langtopProps';
import SaveButton from '@/ui/saveButton';

const DashboardSecurity = ({ selectedInputLang }: ILangTopProps) => {
  const {
    setNewPassword,
    save,
    setOldPassword,
    setRepeatPassword,
    newPassword,
    repeatPassword,
    oldPassword,
    isPasswordMatch,
  } = useSecurityStore();
  const locale = useLocale();

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
      locale === 'ru'
        ? success
          ? 'успешно изменён!'
          : 'Текущий пароль не совпадает!'
        : locale === 'uz'
          ? success
            ? 'muvaffaqiyatli ozgartirildi!'
            : 'Hozirgi parol mos emas!'
          : success
            ? 'Password changed successfully!'
            : 'The current password does not match!';

    toastr[success ? 'success' : 'error'](message);
  };

  return (
    <div>
      <div className="w-full">
        <form className="flex flex-col gap-[15px] rounded-bl-[18px] rounded-br-[18px] bg-white p-[15px] py-[25px] slg:gap-[20px] 2xl:px-[25px] 2xl:py-[37px]">
          <div className="relative w-full cursor-pointer">
            <input
              id="oldPassword"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              onFocus={() => handleFocus('oldPassword', true)}
              onBlur={() => handleFocus('oldPassword', false)}
              className="h-[73px] w-full rounded-2xl bg-[#F8F8F8] px-[25px] pt-[25px] outline-none drop-shadow"
            />
            <label
              onClick={() => handleFocus('oldPassword', true)}
              className={`pointer-events-none absolute left-[25px] flex items-center gap-[10px] transition-all ${
                isFocused['oldPassword'] || oldPassword
                  ? 'top-3 text-xs text-gray-500'
                  : 'top-[26px] text-base text-gray-400'
              }`}
            >
              <TfiKey />

              {selectedInputLang === 'ru'
                ? 'Текущий пароль'
                : selectedInputLang === 'uz'
                  ? 'Hozirgi parol'
                  : 'Current password'}
            </label>
          </div>
          <div className="relative w-full cursor-pointer">
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              onFocus={() => handleFocus('newPassword', true)}
              onBlur={() => handleFocus('newPassword', false)}
              className="h-[73px] w-full rounded-2xl bg-[#F8F8F8] px-[25px] pt-[25px] outline-none drop-shadow"
            />
            <label
              onClick={() => handleFocus('newPassword', true)}
              className={`pointer-events-none absolute left-[25px] flex items-center gap-[10px] transition-all ${
                isFocused['newPassword'] || newPassword
                  ? 'top-3 text-xs text-gray-500'
                  : 'top-[26px] text-base text-gray-400'
              }`}
            >
              <TfiKey />

              {selectedInputLang === 'ru'
                ? 'Новый пароль'
                : selectedInputLang === 'uz'
                  ? 'Yangi parol'
                  : 'New password'}
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
              className="h-[73px] w-full rounded-2xl bg-[#F8F8F8] px-[25px] pt-[25px] outline-none drop-shadow"
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

              {selectedInputLang === 'ru'
                ? 'Повторите пароль'
                : selectedInputLang === 'uz'
                  ? 'Parolni takrorlang'
                  : 'Repeat password'}
            </label>
          </div>
          {!isPasswordMatch && (
            <p className="text-[15px] font-medium text-[#D60C0C] slg:text-[16px] 2xl:text-[17px]">
              {selectedInputLang === 'ru'
                ? 'пароли не совпадают'
                : selectedInputLang === 'uz'
                  ? 'parolalar bir xil emas'
                  : 'passwords do not match'}
            </p>
          )}
        </form>
        <div className="mt-[25px] flex w-full items-center 2xl:order-[3] 2xl:w-[100%] 2xl:justify-end">
          <SaveButton
            selectedInputLang={selectedInputLang}
            onClick={SaveChanges}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardSecurity;
