'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useProfileStore } from '@/store/profileStore';
import 'flowbite';
import 'dayjs/locale/ru';

import toastr from 'toastr';

import { BsGenderMale } from 'react-icons/bs';
import { PiGenderFemale } from 'react-icons/pi';
import { IoIosArrowDown } from 'react-icons/io';
import { BiSolidPencil } from 'react-icons/bi';
import { GoPencil } from 'react-icons/go';
import { TbPhone } from 'react-icons/tb';
import { MdOutlineDateRange } from 'react-icons/md';
import { useLocale } from 'next-intl';
import { ILangTopProps } from '@/interface/langtopProps';
import SaveButton from '@/ui/saveButton';

const Profile = ({ selectedInputLang }: ILangTopProps) => {
  const {
    setName,
    name,
    setSurname,
    surname,
    setPatronymic,
    patronymic,
    phone,
    setPhone,
    gender,
    setGender,
    setImage,
    image,
    setStage,
    exp,
    saveProfile,
    getAllDataWithSlug,
  } = useProfileStore();

  const slug = localStorage.getItem('slug');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [openGender, setOpenGender] = useState(false);
  const locale = useLocale();

  const [previewImage, setPreviewImage] = useState<string>(
    'https://ucarecdn.com/568467e3-d7fd-4272-854e-884e5325aa23/-/preview/354x370/'
  );

  useEffect(() => {
    if (slug) {
      getAllDataWithSlug(slug);
    }
  }, [slug]);

  const SaveChanges = async () => {
    const success = await saveProfile();
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
            ? 'saved successfully!'
            : 'Error saving profile.';

    toastr[success ? 'success' : 'error'](message);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file); // Устанавливаем выбранный файл в Zustand
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setPreviewImage(reader.result as string); // Предпросмотр изображения
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenderSelect = () => setOpenGender(!openGender);

  return (
    <div className="mt-[25px] 2xl:mt-[37px]">
      <div className="flex flex-col 2xl:flex-row 2xl:flex-wrap 2xl:gap-[2%]">
        <div className="relative h-[264px] w-full overflow-hidden rounded-[18px] bg-white p-[4px] slg:h-[300px] 2xl:h-[350px] 2xl:w-[33%]">
          <label
            htmlFor="file-input"
            className="absolute z-[99] h-full w-full cursor-pointer"
          >
            <Image
              src={
                image instanceof File
                  ? URL.createObjectURL(image)
                  : typeof image === 'string'
                    ? image
                    : previewImage
              }
              alt="Profile Preview"
              width={1000}
              height={950}
              loading="lazy"
              layout="responsive"
              quality={75}
              className="h-full w-full rounded-[20px] object-cover"
            />
            <button className="absolute right-[20px] top-[20px] z-10 flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#050B2B80] bg-opacity-[50%] text-center text-white 2xl:h-[45px] 2xl:w-[45px]">
              <BiSolidPencil />
            </button>
          </label>
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* inputs */}
        <div className="2xl:flex-grow-1 mt-[20px] flex flex-col gap-[12px] rounded-[18px] bg-white p-[15px] 2xl:mt-0 2xl:w-[60%] 2xl:gap-[20px]">
          <div className="relative">
            <input
              value={name[selectedInputLang]}
              onChange={(e) =>
                setName({ ...name, [selectedInputLang]: e.target.value })
              }
              placeholder={
                selectedInputLang === 'ru'
                  ? 'Имя'
                  : selectedInputLang === 'uz'
                    ? 'Ism'
                    : 'Name'
              }
              className="focus:ring-ring w-full rounded-[12px] bg-[#F8F8F8] px-[15px] py-[18px] pl-[40px] text-[#747474] focus:outline-none focus:ring-1"
            />
            <GoPencil className="text-muted-foreground absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#747474]" />
          </div>
          <div className="relative">
            <input
              value={surname[selectedInputLang]}
              onChange={(e) =>
                setSurname({ ...surname, [selectedInputLang]: e.target.value })
              }
              placeholder={
                selectedInputLang === 'ru'
                  ? 'Фамилия'
                  : selectedInputLang === 'uz'
                    ? 'Familiya'
                    : 'Last Name'
              }
              className="focus:ring-ring w-full rounded-[12px] bg-[#F8F8F8] px-[15px] py-[18px] pl-[40px] text-[#747474] focus:outline-none focus:ring-1"
            />
            <GoPencil className="text-muted-foreground absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#747474]" />
          </div>
          <div className="relative">
            <input
              value={patronymic[selectedInputLang]}
              onChange={(e) =>
                setPatronymic({
                  ...patronymic,
                  [selectedInputLang]: e.target.value,
                })
              }
              placeholder={
                selectedInputLang === 'ru'
                  ? 'Отчество'
                  : selectedInputLang === 'uz'
                    ? 'Sharif'
                    : 'Middle Name'
              }
              className="focus:ring-ring w-full rounded-[12px] bg-[#F8F8F8] px-[15px] py-[18px] pl-[40px] text-[#747474] focus:outline-none focus:ring-1"
            />
            <GoPencil className="text-muted-foreground absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#747474]" />
          </div>

          <div className="flex w-full flex-col gap-[12px] 2xl:mt-[20px] 2xl:flex-row 2xl:items-center 2xl:gap-[20px]">
            <div className="relative 2xl:mt-[-20px] 2xl:w-[31%]">
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={
                  selectedInputLang === 'ru'
                    ? 'Телефон'
                    : selectedInputLang === 'uz'
                      ? 'Telefon'
                      : 'Phone'
                }
                className="focus:ring-ring w-full rounded-[12px] bg-[#F8F8F8] px-[15px] py-[18px] pl-[40px] text-[#747474] focus:outline-none focus:ring-1"
              />
              <TbPhone className="text-muted-foreground absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#747474]" />
            </div>
            <div className="relative 2xl:mt-[-20px] 2xl:w-[31%]">
              <input
                value={exp?.toString()}
                type="number"
                onChange={(e) => setStage(Number(e.target.value))}
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
            {/* Кастомный DatePicker с кнопкой */}

            <div className="relative mt-[-5px] 2xl:mt-[-20px] 2xl:w-[31%]">
              <button
                type="button"
                onClick={() => handleGenderSelect()}
                className="focus:ring-ring flex w-full items-center justify-between rounded-[12px] bg-[#F8F8F8] px-[15px] py-[18px] text-left text-[#747474] focus:outline-none focus:ring-1"
              >
                <div className="flex items-center">
                  {gender.en === 'Male' ? (
                    <BsGenderMale className="mr-2 text-[#747474]" />
                  ) : (
                    <PiGenderFemale className="mr-2 text-[#747474]" />
                  )}
                  {gender[selectedInputLang]}
                </div>
                <IoIosArrowDown />
              </button>
              {openGender && (
                <div className="absolute z-20 mt-2 w-full rounded-md bg-white shadow-lg">
                  <div
                    className="cursor-pointer p-2 py-[10px] hover:bg-gray-100"
                    onClick={() => {
                      setGender({ ru: 'Мужчина', uz: 'Erkak', en: 'Male' });
                      setOpenGender(false);
                    }}
                  >
                    <BsGenderMale className="mr-2 inline-block" />
                    {selectedInputLang === 'ru'
                      ? 'Мужчина'
                      : selectedInputLang == 'uz'
                        ? 'Erkak'
                        : 'Male'}
                  </div>
                  <div
                    className="cursor-pointer p-2 py-[10px] hover:bg-gray-100"
                    onClick={() => {
                      setGender({ ru: 'Женщины', uz: 'Ayol', en: 'Female' });

                      setOpenGender(false);
                    }}
                  >
                    <PiGenderFemale className="mr-2 inline-block" />
                    {selectedInputLang === 'ru'
                      ? 'Женщины'
                      : selectedInputLang == 'uz'
                        ? 'Ayol'
                        : 'Female'}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* BUTTON SAVE */}
        <div className="mt-[25px] flex w-full items-center 2xl:order-[3] 2xl:w-[100%] 2xl:justify-end">
          <div className="w-full lg:w-60 2xl:w-64">
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

export default Profile;
