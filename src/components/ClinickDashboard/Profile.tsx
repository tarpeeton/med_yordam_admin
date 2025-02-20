'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import 'flowbite';
import 'dayjs/locale/ru';
import { MdOutlineAttachFile, MdOutlineDateRange } from 'react-icons/md';
import { BiSolidPencil } from 'react-icons/bi';
import { GoPencil } from 'react-icons/go';
import { TbPhone } from 'react-icons/tb';
import { useLocale } from 'next-intl';
import InputMask from 'react-input-mask';
import toastr from 'toastr';

import SaveButton from '@/ui/saveButton';
import { useClinicProfileStore } from '@/store/clinick/profile';
import { ILangTopProps } from '@/interface/langtopProps';

export const Profile = ({ selectedInputLang }: ILangTopProps) => {
  const locale = useLocale() as 'ru' | 'uz' | 'en';

  const {
    saveClinicProfile,
    setFormData,
    name,
    experience,
    phone,
    phone2,
    workFrom,
    workTo,
    logo,
    photo,
    getclinickWithslug,
  } = useClinicProfileStore();

  const photoInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedPhotoFile, setSelectedPhotoFile] = useState<File | null>(null);
  const [previewPhoto, setPreviewPhoto] = useState<string>(
    'https://ucarecdn.com/568467e3-d7fd-4272-854e-884e5325aa23/-/preview/354x370/'
  );

  const handlePhotoButtonClick = () => {
    photoInputRef.current?.click();
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedPhotoFile(file);

      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setPreviewPhoto(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
      setFormData({ photo: file });
    }
  };

  // FETCH CLINICK readAsDataURL

  useEffect(() => {
    const slug = localStorage.getItem('slug');
    if (slug) {
      getclinickWithslug(slug);
    }
  }, []);

  const logoInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedLogoFile, setSelectedLogoFile] = useState<File | null>(null);
  const [previewLogo, setPreviewLogo] = useState<string>('');

  const handleLogoButtonClick = () => {
    logoInputRef.current?.click();
  };

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedLogoFile(file);

      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setPreviewLogo(reader.result as string);
        }
      };
      reader.readAsDataURL(file);

      setFormData({ logo: file });
    }
  };

  const SaveChanges = async () => {
    const success = await saveClinicProfile();
    const message =
      locale === 'ru'
        ? success
          ? 'успешно сохранён!'
          : 'Ошибка при сохранении'
        : locale === 'uz'
          ? success
            ? 'muvaffaqiyatli saqlandi!'
            : 'Saqlashda xatolik yuz berdi.'
          : success
            ? 'Saved successfully!'
            : 'Error saving profile.';

    toastr[success ? 'success' : 'error'](message);
  };

  return (
    <div className="mt-[25px] 2xl:mt-[37px]">
      <div className="flex flex-col 2xl:flex-row 2xl:flex-wrap 2xl:gap-[2%]">
        {/* PHOTO (avatar) bo'limi */}
        <div className="relative h-[264px] w-full overflow-hidden bg-white p-[4px] slg:h-[300px] 2xl:h-[350px] 2xl:w-[38%]">
          <label
            htmlFor="photo-input"
            className="absolute z-[99] h-full w-full cursor-pointer"
          >
            <Image
              src={
                photo instanceof File
                  ? URL.createObjectURL(photo)
                  : typeof photo === 'object' &&
                      photo !== null &&
                      'url' in photo
                    ? photo.url
                    : typeof photo === 'string'
                      ? photo
                      : previewPhoto
              }
              alt="Profile Preview"
              width={1000}
              height={950}
              loading="lazy"
              quality={100}
              className="h-full w-full rounded-[20px] object-cover"
            />
            <button
              type="button"
              onClick={handlePhotoButtonClick}
              className="absolute right-[20px] top-[20px] z-10 flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#050B2B80] bg-opacity-[50%] text-center text-white 2xl:h-[45px] 2xl:w-[45px]"
            >
              <BiSolidPencil />
            </button>
          </label>
          <input
            id="photo-input"
            type="file"
            ref={photoInputRef}
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />
        </div>

        <div className="2xl:flex-grow-1 mt-[20px] flex flex-col gap-[12px] rounded-[18px] bg-white p-[15px] 2xl:mt-0 2xl:w-[60%] 2xl:gap-[20px]">
          <div className="relative">
            <input
              value={name}
              onChange={(e) => setFormData({ name: e.target.value })}
              placeholder={
                selectedInputLang === 'ru'
                  ? 'Название клиники'
                  : selectedInputLang === 'uz'
                    ? 'Klinika nomi'
                    : 'Clinic Name'
              }
              className="focus:ring-ring w-full rounded-[12px] bg-[#F8F8F8] px-[15px] py-[18px] pl-[40px] text-[#747474] focus:outline-none focus:ring-1"
            />
            <GoPencil className="text-muted-foreground absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#747474]" />
          </div>

          <div className="grid grid-cols-1 gap-3 2xl:grid-cols-3">
            <div className="relative">
              <input
                value={experience?.toString()}
                type="number"
                onChange={(e) =>
                  setFormData({ experience: Number(e.target.value) })
                }
                placeholder={
                  selectedInputLang === 'ru'
                    ? 'Опыт'
                    : selectedInputLang === 'uz'
                      ? 'Tajribasi'
                      : 'Experience'
                }
                className="focus:ring-ring w-full rounded-[12px] bg-[#F8F8F8] px-[15px] py-[18px] pl-[40px] text-[#747474] focus:outline-none focus:ring-1"
              />
              <MdOutlineDateRange className="text-muted-foreground absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#747474]" />
            </div>
            <div className="relative">
              <InputMask
                mask="+998 (99) 999-99-99"
                value={phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ phone: e.target.value })
                }
              >
                {(inputProps) => (
                  <input
                    {...inputProps}
                    type="tel"
                    placeholder={
                      selectedInputLang === 'ru'
                        ? 'Телефон'
                        : selectedInputLang === 'uz'
                          ? 'Telefon'
                          : 'Phone'
                    }
                    className="focus:ring-ring w-full rounded-[12px] bg-[#F8F8F8] px-[15px] py-[18px] pl-[40px] text-[#747474] focus:outline-none focus:ring-1"
                  />
                )}
              </InputMask>
              <GoPencil className="text-muted-foreground absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#747474]" />
            </div>

            <div className="relative">
              <InputMask
                mask="+998 (99) 999-99-99"
                value={phone2}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ phone2: e.target.value })
                }
              >
                {(inputProps) => (
                  <input
                    {...inputProps}
                    type="tel"
                    placeholder={
                      selectedInputLang === 'ru'
                        ? 'Телефон 2'
                        : selectedInputLang === 'uz'
                          ? 'Telefon 2'
                          : 'Phone 2'
                    }
                    className="focus:ring-ring w-full rounded-[12px] bg-[#F8F8F8] px-[15px] py-[18px] pl-[40px] text-[#747474] focus:outline-none focus:ring-1"
                  />
                )}
              </InputMask>
              <TbPhone className="text-muted-foreground absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#747474]" />
            </div>

            <div>
              <p className="font-medium text-titleDark">
                {selectedInputLang === 'ru'
                  ? 'Лого '
                  : selectedInputLang === 'uz'
                    ? 'Logo'
                    : 'Logo'}
              </p>
            </div>
            <div className="hidden 2xl:block">
              <p className="font-medium text-titleDark">
                {selectedInputLang === 'ru'
                  ? 'Режим работы'
                  : selectedInputLang === 'uz'
                    ? 'Ish vaqtlari'
                    : 'Work schedule'}
              </p>
            </div>
            <div className="hidden 2xl:block"></div>
            <button
              type="button"
              className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-MyBlue py-3 2xl:h-[75px]"
              onClick={handleLogoButtonClick}
            >
              {logo && (
                <div className="flex h-full w-full items-center">
                  <Image
                    src={
                      logo instanceof File
                        ? URL.createObjectURL(logo)
                        : typeof logo === 'object' &&
                            logo !== null &&
                            'url' in logo
                          ? logo.url
                          : typeof logo === 'string'
                            ? logo
                            : previewLogo
                    }
                    alt="Logo Preview"
                    width={120}
                    height={80}
                    className="w-full rounded-md object-cover 2xl:h-20"
                  />
                </div>
              )}
              {!logo && (
                <div className="flex flex-col items-center">
                  <MdOutlineAttachFile className="h-5 w-5 rotate-45 text-MyBlue 2xl:h-6 2xl:w-6" />
                  <p className="mt-3 font-medium text-MyBlue">
                    {selectedInputLang === 'ru'
                      ? 'Прикрепить Лого'
                      : selectedInputLang === 'uz'
                        ? 'Logoni yuklash'
                        : 'Upload Logo'}
                  </p>
                </div>
              )}
            </button>

            <input
              type="file"
              id="logo-input"
              ref={logoInputRef}
              accept="image/*"
              onChange={handleLogoChange}
              className="hidden"
            />
            <div className="block 2xl:hidden">
              <p className="font-medium text-titleDark">
                {selectedInputLang === 'ru'
                  ? 'Режим работы'
                  : selectedInputLang === 'uz'
                    ? 'Ish vaqtlari'
                    : 'Work schedule'}
              </p>
            </div>
            <div className="relative flex items-center">
              <input
                value={workFrom?.toString()}
                type="string"
                onChange={(e) => setFormData({ workFrom: e.target.value })}
                placeholder={
                  selectedInputLang === 'ru'
                    ? 'От: 8:00'
                    : selectedInputLang === 'uz'
                      ? '8:00  Dan'
                      : 'From: 8:00'
                }
                className="focus:ring-ring w-full rounded-[12px] bg-[#F8F8F8] px-[15px] py-[18px] pl-[40px] text-[#747474] focus:outline-none focus:ring-1"
              />
              <GoPencil className="text-muted-foreground absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#747474]" />
            </div>

            <div className="relative flex items-center">
              <input
                value={workTo?.toString()}
                type="string"
                onChange={(e) => setFormData({ workTo: e.target.value })}
                placeholder={
                  selectedInputLang === 'ru'
                    ? 'До : 19:00'
                    : selectedInputLang === 'uz'
                      ? '19:00 Gacha'
                      : 'To 19:00'
                }
                className="focus:ring-ring w-full rounded-[12px] bg-[#F8F8F8] px-[15px] py-[18px] pl-[40px] text-[#747474] focus:outline-none focus:ring-1"
              />
              <GoPencil className="text-muted-foreground absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#747474]" />
            </div>
          </div>
        </div>
        <div className="mt-[25px] flex w-full items-center 2xl:order-[3] 2xl:w-[100%] 2xl:justify-end">
          <div className="2xl:w-64">
            <SaveButton
              selectedInputLang={selectedInputLang}
              onClick={SaveChanges}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
