"use client";

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { BiSolidPencil } from "react-icons/bi";
import Image from 'next/image';
import { GoPencil } from "react-icons/go";
import { useProfileStore } from '@/store/profileStore';
import { TbPhone } from "react-icons/tb";
import 'flowbite';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker } from 'antd';
import 'dayjs/locale/ru'; // если нужна локализация (подставьте нужную локаль)
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { MdOutlineDateRange } from "react-icons/md";



interface IProfileProps {
  selectedInputLang: "ru" | "uz" | "en";
}



dayjs.extend(customParseFormat);

const dateFormat = 'YYYY/MM/DD';


const Profile = ({ selectedInputLang }: IProfileProps) => {

  const { setName, name, setSurname, surname, setPatronymic, patronymic, phone, setPhone, setAge, age, setGender, setImage, image } = useProfileStore();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);


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
      // Можно, например, установить возраст или дату рождения через стор
      // setAge(...) или другой экшн
      // В вашем случае можно хранить просто дату, а возраст расчитать отдельно, если нужно
    }
    // Закрываем календарь после выбора
    setIsDatePickerOpen(false);
  };

  const placeholders = {
    name: {
      ru: 'Имя',
      uz: 'Ism',
      en: 'Name'
    },
    surname: {
      ru: 'Фамилия',
      uz: 'Familiya',
      en: 'Last Name'
    },
    patronymic: {
      ru: 'Отчество',
      uz: 'Sharif',
      en: 'Middle Name'
    },
    phone: {
      ru: 'Телефон',
      uz: 'Telefon',
      en: 'Phone'
    },
    age: {
      ru: 'Возраст',
      uz: 'Yosh',
      en: 'Age'
    },
  };

  return (
    <div className='mt-[25px] 2xl:mt-[37px]'>
      <div className='flex flex-col 2xl:flex-row'>
        <div className='w-full rounded-[20px] h-[264px] slg:h-[300px] 2xl:h-[340px]  relative' >
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
        <div className='flex flex-col rounded-[18px] gap-[12px] 2xl:gap-[20px] p-[15px] bg-white'>
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
          <div className='relative '>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={selectedInputLang === 'ru' ? 'Телефон' : selectedInputLang === 'uz' ? 'Telefon' : 'Phone'}
              className='w-full text-[#747474] rounded-[12px] focus:outline-none focus:ring-1 focus:ring-ring py-[18px] pl-[40px] px-[15px] bg-[#F8F8F8]  ' />
            <TbPhone className="absolute text-[#747474] left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          </div>

          {/* Кастомный DatePicker с кнопкой */}
          <div className='relative'>
            <button
              type='button'
              onClick={() => setIsDatePickerOpen((prev) => !prev)}
              className='w-full text-left text-[#747474] rounded-[12px] focus:outline-none focus:ring-1 focus:ring-ring py-[18px] px-[15px] bg-[#F8F8F8] flex items-center justify-between'
            >
              <div className="flex items-center">
                <MdOutlineDateRange className="text-[#747474] mr-2" />
                {selectedDate ? selectedDate.format(dateFormat) : placeholders.age[selectedInputLang]}
              </div>
              <svg className={`w-4 h-4 ml-2 transition-transform ${isDatePickerOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isDatePickerOpen && (
              <div className='absolute  z-50 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4'>
                <DatePicker
                  value={selectedDate}
                  open={true}
                  format={dateFormat}
                  onChange={handleDateChange}
                  showToday={false}
                  renderExtraFooter={() => null}
                  inputReadOnly
                  inputRender={(inputProps) => <input {...inputProps} title="ssss" />}
                />
              </div>
            )}
          </div>



        </div>
        {/* BUTTON SAVE */}
        <div className='2xl:order-[3] w-full 2xl:w-[100%] flex items-center 2xl:justify-end'>
          <button className=''>

          </button>
        </div>
      </div>

    </div>
  )
}

export default Profile
