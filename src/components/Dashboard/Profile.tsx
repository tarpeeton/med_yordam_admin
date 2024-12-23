"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useProfileStore } from '@/store/profileStore';
import 'flowbite';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from 'antd';
import 'dayjs/locale/ru'; // если нужна локализация (подставьте нужную локаль)
import customParseFormat from 'dayjs/plugin/customParseFormat';
import ruLocale from 'antd/es/date-picker/locale/ru_RU';
import enLocale from 'antd/es/date-picker/locale/en_US';


import { BsGenderMale } from "react-icons/bs";
import { PiGenderFemale } from "react-icons/pi";
import { IoIosArrowDown } from "react-icons/io";
import { BiSolidPencil } from "react-icons/bi";
import { GoPencil } from "react-icons/go";
import { TbPhone } from "react-icons/tb";
import { MdOutlineDateRange } from "react-icons/md";
import { FaRegCalendarPlus } from "react-icons/fa";

interface IProfileProps {
  selectedInputLang: "ru" | "uz" | "en";
}



dayjs.extend(customParseFormat);

const dateFormat = 'YYYY/MM/DD';


const Profile = ({ selectedInputLang }: IProfileProps) => {

  const { setName, name, setSurname, surname, setPatronymic, patronymic, phone, setPhone, gender, setGender, setImage, image, setStage, stage , saveProfile } = useProfileStore();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [openGender, setOpenGender] = useState(false)

  const [previewImage, setPreviewImage] = useState<string>(
    "https://ucarecdn.com/568467e3-d7fd-4272-854e-884e5325aa23/-/preview/354x370/"
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setPreviewImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };


  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
    if (date) {
      setStage(String(date))
    }
    // Закрываем календарь после выбора
    setIsDatePickerOpen(false);
  };

  


  const getLocale = () => {
    if (selectedInputLang === 'ru') return ruLocale;
    if (selectedInputLang === 'en') return enLocale;
    if (selectedInputLang === 'uz') return ruLocale;
    return enLocale; // fallback
  };


  const handleGenderSelect = () => setOpenGender(!openGender);


  return (
    <div className='mt-[25px] 2xl:mt-[37px]'>
      <div className='flex flex-col 2xl:flex-row 2xl:gap-[2%] 2xl:flex-wrap'>
        <div className='w-full rounded-[20px] bg-white 2xl:w-[38%] p-[4px] h-[264px] slg:h-[300px] 2xl:h-[350px]  relative' >
          <label htmlFor="file-input" className="relative cursor-pointer z-10">
            <Image
              src={previewImage}
              alt="Profile Preview"
              width={300}
              height={360}
              className='w-full h-full object-cover'
            />
            <button className="absolute top-[20px] right-[20px] rounded-full flex items-center justify-center text-center w-[40px] h-[40px] 2xl:w-[45px] 2xl:h-[45px] bg-[#050B2B80] bg-opacity-[50%] text-white">
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
        <div className='flex flex-col mt-[20px] 2xl:mt-0 rounded-[18px] 2xl:w-[60%] 2xl:flex-grow-1 gap-[12px] 2xl:gap-[20px] p-[15px] bg-white'>
          <div className='relative '>
            <input
              value={name[selectedInputLang]}
              onChange={(e) => setName({ ...name, [selectedInputLang]: e.target.value })}
              placeholder={selectedInputLang === 'ru' ? 'Имя' : selectedInputLang === 'uz' ? 'Ism' : 'Name'}
              className='w-full text-[#747474] rounded-[12px] focus:outline-none focus:ring-1 focus:ring-ring py-[18px] pl-[40px] px-[15px] bg-[#F8F8F8]  ' />
            <GoPencil className="absolute text-[#747474] left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          </div>
          <div className='relative '>
            <input
              value={surname[selectedInputLang]}
              onChange={(e) => setSurname({ ...name, [selectedInputLang]: e.target.value })}
              placeholder={selectedInputLang === 'ru' ? 'Фамилия' : selectedInputLang === 'uz' ? 'Familiya' : 'Last Name'}
              className='w-full text-[#747474] rounded-[12px] focus:outline-none focus:ring-1 focus:ring-ring py-[18px] pl-[40px] px-[15px] bg-[#F8F8F8]  ' />
            <GoPencil className="absolute text-[#747474] left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          </div>
          <div className='relative '>
            <input
              value={patronymic[selectedInputLang]}
              onChange={(e) => setPatronymic({ ...name, [selectedInputLang]: e.target.value })}
              placeholder={selectedInputLang === 'ru' ? 'Отчество' : selectedInputLang === 'uz' ? 'Sharif' : 'Middle Name'}
              className='w-full text-[#747474] rounded-[12px] focus:outline-none focus:ring-1 focus:ring-ring py-[18px] pl-[40px] px-[15px] bg-[#F8F8F8]  ' />
            <GoPencil className="absolute text-[#747474] left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          </div>
          


          <div className='flex flex-col gap-[12px] 2xl:flex-row w-full 2xl:items-center 2xl:gap-[20px]'>
          <div className='relative 2xl:w-[31%] 2xl:mt-[-20px] '>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={selectedInputLang === 'ru' ? 'Телефон' : selectedInputLang === 'uz' ? 'Telefon' : 'Phone'}
              className='w-full text-[#747474] rounded-[12px] focus:outline-none focus:ring-1 focus:ring-ring py-[18px] pl-[40px] px-[15px] bg-[#F8F8F8]  ' />
            <TbPhone className="absolute text-[#747474] left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          </div>
            {/* Кастомный DatePicker с кнопкой */}
            <div className='relative 2xl:w-[31%]'>
              <button
                type='button'
                onClick={() => setIsDatePickerOpen((prev) => !prev)}
                className='w-full text-left text-[#747474] rounded-[12px] focus:outline-none focus:ring-1 focus:ring-ring py-[18px] px-[15px] bg-[#F8F8F8] flex items-center justify-between'
              >
                <div className="flex items-center">
                  <MdOutlineDateRange className="text-[#747474] mr-2" />
                  {selectedDate ? selectedDate.format(dateFormat) : selectedInputLang === 'ru' ? 'Опыт работы' : selectedInputLang === 'uz' ? 'ish tajribasi' : 'Work experience' }
                </div>
                <svg className={`w-4 h-4 ml-2 transition-transform ${isDatePickerOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <DatePicker
                open={isDatePickerOpen}
                onOpenChange={(open) => setIsDatePickerOpen(open)}
                value={selectedDate}
                onChange={handleDateChange}
                showToday={false}
                renderExtraFooter={() => null}
                // убираем стандартные элементы
                allowClear={false}
                inputReadOnly
                locale={getLocale()} // динамическая локаль
                inputRender={() => null} // Возвращаем null или пустой фрагмент, чтобы не рендерить инпут
                suffixIcon={null} // убираем иконку внутри инпута
                style={{ border: 'none', background: 'transparent' }}
              />
            </div>
            <div className='relative mt-[-20px] 2xl:w-[31%]'>
              <button
                type='button'
                onClick={() => handleGenderSelect()}
                className='w-full text-left text-[#747474] rounded-[12px] focus:outline-none focus:ring-1 focus:ring-ring py-[18px] px-[15px] bg-[#F8F8F8] flex items-center justify-between'
              >
                <div className="flex items-center">
                  {gender.en === 'Male' ? <BsGenderMale className="text-[#747474] mr-2" /> : <PiGenderFemale className="text-[#747474] mr-2" />}
                  {gender[selectedInputLang]}
                </div>
                <IoIosArrowDown />
              </button>
              {openGender && (
                <div className="absolute bg-white rounded-md shadow-lg mt-2 w-full z-20">
                  <div
                    className="p-2 cursor-pointer hover:bg-gray-100 py-[10px]"
                    onClick={() => {
                      setGender({ ru: 'Мужчина', uz: "Erkak", en: "Male" });
                      setOpenGender(false);
                    }}
                  >
                    <BsGenderMale className="inline-block mr-2" />
                    {selectedInputLang === 'ru' ? "Мужчина" : selectedInputLang == 'uz' ? "Erkak" : "Male"}
                  </div>
                  <div
                    className="p-2 cursor-pointer hover:bg-gray-100 py-[10px]"
                    onClick={() => {
                      setGender({ ru: 'Женщины', uz: "Ayol", en: "Female" });

                      setOpenGender(false);
                    }}
                  >
                    <PiGenderFemale className="inline-block mr-2" />
                    {selectedInputLang === 'ru' ? "Женщины" : selectedInputLang == 'uz' ? "Ayol" : "Female"}

                  </div>
                </div>
              )}

            </div>
           

          </div>


        </div>
        {/* BUTTON SAVE */}
        <div className='2xl:order-[3] mt-[25px] w-full 2xl:w-[100%] flex items-center 2xl:justify-end'>
          <button  onClick={saveProfile} className='bg-[#0129E3] 2xl:w-[235px] py-[20px] w-full rounded-[12px] font-medium text-center text-white'>
            {selectedInputLang === 'ru' ? 'Сохранить' : selectedInputLang === 'uz' ? 'Saqlash' : 'Save'}
          </button>
        </div>
      </div>

    </div>
  )
}

export default Profile
