"use client"
import YandexMap from '@/components/Dashboard/YandexMap';
import { useAddressStore } from '@/store/createAddressStore';
import { FC, useState, useEffect } from 'react'
import { GoPencil } from "react-icons/go";
import { IoClose } from "react-icons/io5";



interface IAddressProps {
  selectedInputLang: "ru" | "uz" | "en";
}


const DashboardAddress = ({ selectedInputLang }: IAddressProps) => {
  const { address, clinicName, days, cost, time, landmark, location, setField } = useAddressStore()

  return (
    <div>
      <div className='px-[15px] py-[25px] bg-white rounded-bl-[18px] rounded-br-[18px] 2xl:py-[37px] 2xl:px-[25px]'>
        <div>
          <div className='flex flex-row items-center mb-[10px]'>
            <h1 className='text-[#0129E3] text-[17px] 2xl:text-[20px] font-semibold'>Место приема №1</h1>
            <button>
              <IoClose className='text-[#0129E3] ml-[10px] text-[20px] 2xl:w-[25px] 2xl:h-[25px]' />
            </button>
          </div>
          <div className='grid grid-cols-1 2xl:grid-cols-3 gap-[12px] '>
            <div className='relative'>
              <input
                value={clinicName}
                onChange={(e) =>
                  setField("clinicName", e.target.value)
              }
              placeholder={
                selectedInputLang === "ru"
                  ? "Название клиники"
                  : selectedInputLang === "uz"
                    ? "Klinik nomi"
                    : "Clinic Name"
              }
              className='w-full text-[#747474] rounded-[12px] focus:outline-none focus:ring-1 focus:ring-ring py-[18px] pl-[50px] px-[15px] bg-[#F8F8F8]  ' />
            <GoPencil className="absolute text-[#0129E3] left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          </div>
          <div className='relative'>
            <input
              value={address}
              onChange={(e) =>
                setField("address", e.target.value)
              }
              placeholder={
                selectedInputLang === "ru"
                  ? "Адрес"
                  : selectedInputLang === "uz"
                    ? "Manzil"
                    : "Address"
              }
              className='w-full text-[#747474] rounded-[12px] focus:outline-none focus:ring-1 focus:ring-ring py-[18px] pl-[50px] px-[15px] bg-[#F8F8F8]  ' />
            <GoPencil className="absolute text-[#0129E3] left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          </div>
          <div className='relative'>
            <input
              value={landmark}
              onChange={(e) =>
                setField("landmark", e.target.value)
              }
              placeholder={
                selectedInputLang === "ru"
                  ? "Ориентир"
                  : selectedInputLang === "uz"
                    ? "Xonadon"
                    : "Landmark"
              }
              className='w-full text-[#747474] rounded-[12px] focus:outline-none focus:ring-1 focus:ring-ring py-[18px] pl-[50px] px-[15px] bg-[#F8F8F8]  ' />
            <GoPencil className="absolute text-[#0129E3] left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          </div>
          <div className='relative'>
            <input
              value={days}
              onChange={(e) =>
                setField("days", e.target.value)
              }
              placeholder={
                selectedInputLang === "ru"
                  ? "Дни приема"
                  : selectedInputLang === "uz"
                    ? "Qabul kunlari"
                    : "Reception Days"
              }
              className='w-full text-[#747474] rounded-[12px] focus:outline-none focus:ring-1 focus:ring-ring py-[18px] pl-[50px] px-[15px] bg-[#F8F8F8]  ' />
            <GoPencil className="absolute text-[#0129E3] left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          </div>
          <div className='relative'>
            <input
              value={cost}
              onChange={(e) =>
                setField("cost", e.target.value)
              }
              placeholder={
                selectedInputLang === "ru"
                  ? "Стоимость консультации"
                  : selectedInputLang === "uz"
                    ? "Konsultatsiya narxi"
                    : "Consultation Cost"
              }
              className='w-full text-[#747474] rounded-[12px] focus:outline-none focus:ring-1 focus:ring-ring py-[18px] pl-[50px] px-[15px] bg-[#F8F8F8]  ' />
            <GoPencil className="absolute text-[#0129E3] left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          </div>
          <div className='relative col-span-full w-full'>
            <input
              value={String(location.latitude) + " " + String(location.longitude)}
            disabled={true}
              placeholder={
                selectedInputLang === "ru"
                  ? "Место на карте"
                  : selectedInputLang === "uz"
                    ? "Xaritada manzil"
                    : "Location on the map"
              }
              className='w-full text-[#747474] rounded-[12px] focus:outline-none focus:ring-1 focus:ring-ring py-[18px] pl-[50px] px-[15px] bg-[#F8F8F8]  ' />
            <GoPencil className="absolute text-[#0129E3] left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          </div>
          <div className='relative '>
            <input
              value={time}
              onChange={(e) =>
                setField("time", e.target.value)
              }
              placeholder={
                selectedInputLang === "ru"
                  ? "Время приема"
                  : selectedInputLang === "uz"
                    ? "Qabul vaqti"
                    : "Reception Time"
              }
              className='w-full text-[#747474] rounded-[12px] focus:outline-none focus:ring-1 focus:ring-ring py-[18px] pl-[50px] px-[15px] bg-[#F8F8F8]  ' />
            <GoPencil className="absolute text-[#0129E3] left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          </div>
          <div className='relative col-span-full w-full'>
            <YandexMap
              location={location}
              onLocationChange={(coords) => setField("location", coords)} />
          
          </div>


        </div>
        </div>
        <div className='mt-[20px] 2xl:mt-[60px]'>
          <div className='flex flex-row items-center mb-[10px]'>
            <h1 className='text-[#0129E3] text-[17px] 2xl:text-[20px] font-semibold'>Место приема №2</h1>
            <button>
              <IoClose className='text-[#0129E3] ml-[10px] text-[20px] 2xl:w-[25px] 2xl:h-[25px]' />
            </button>
          </div>
          <div className='grid grid-cols-1 2xl:grid-cols-3 gap-[12px] '>
            <div className='relative'>
              <input
                value={clinicName}
                onChange={(e) =>
                  setField("clinicName", e.target.value)
              }
              placeholder={
                selectedInputLang === "ru"
                  ? "Название клиники"
                  : selectedInputLang === "uz"
                    ? "Klinik nomi"
                    : "Clinic Name"
              }
              className='w-full text-[#747474] rounded-[12px] focus:outline-none focus:ring-1 focus:ring-ring py-[18px] pl-[50px] px-[15px] bg-[#F8F8F8]  ' />
            <GoPencil className="absolute text-[#0129E3] left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          </div>
          <div className='relative'>
            <input
              value={address}
              onChange={(e) =>
                setField("address", e.target.value)
              }
              placeholder={
                selectedInputLang === "ru"
                  ? "Адрес"
                  : selectedInputLang === "uz"
                    ? "Manzil"
                    : "Address"
              }
              className='w-full text-[#747474] rounded-[12px] focus:outline-none focus:ring-1 focus:ring-ring py-[18px] pl-[50px] px-[15px] bg-[#F8F8F8]  ' />
            <GoPencil className="absolute text-[#0129E3] left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          </div>
          <div className='relative'>
            <input
              value={landmark}
              onChange={(e) =>
                setField("landmark", e.target.value)
              }
              placeholder={
                selectedInputLang === "ru"
                  ? "Ориентир"
                  : selectedInputLang === "uz"
                    ? "Xonadon"
                    : "Landmark"
              }
              className='w-full text-[#747474] rounded-[12px] focus:outline-none focus:ring-1 focus:ring-ring py-[18px] pl-[50px] px-[15px] bg-[#F8F8F8]  ' />
            <GoPencil className="absolute text-[#0129E3] left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          </div>
          <div className='relative'>
            <input
              value={days}
              onChange={(e) =>
                setField("days", e.target.value)
              }
              placeholder={
                selectedInputLang === "ru"
                  ? "Дни приема"
                  : selectedInputLang === "uz"
                    ? "Qabul kunlari"
                    : "Reception Days"
              }
              className='w-full text-[#747474] rounded-[12px] focus:outline-none focus:ring-1 focus:ring-ring py-[18px] pl-[50px] px-[15px] bg-[#F8F8F8]  ' />
            <GoPencil className="absolute text-[#0129E3] left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          </div>
          <div className='relative'>
            <input
              value={cost}
              onChange={(e) =>
                setField("cost", e.target.value)
              }
              placeholder={
                selectedInputLang === "ru"
                  ? "Стоимость консультации"
                  : selectedInputLang === "uz"
                    ? "Konsultatsiya narxi"
                    : "Consultation Cost"
              }
              className='w-full text-[#747474] rounded-[12px] focus:outline-none focus:ring-1 focus:ring-ring py-[18px] pl-[50px] px-[15px] bg-[#F8F8F8]  ' />
            <GoPencil className="absolute text-[#0129E3] left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          </div>
          <div className='relative col-span-full w-full'>
            <input
              value={String(location.latitude) + " " + String(location.longitude)}
            disabled={true}
              placeholder={
                selectedInputLang === "ru"
                  ? "Место на карте"
                  : selectedInputLang === "uz"
                    ? "Xaritada manzil"
                    : "Location on the map"
              }
              className='w-full text-[#747474] rounded-[12px] focus:outline-none focus:ring-1 focus:ring-ring py-[18px] pl-[50px] px-[15px] bg-[#F8F8F8]  ' />
            <GoPencil className="absolute text-[#0129E3] left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          </div>
          <div className='relative '>
            <input
              value={time}
              onChange={(e) =>
                setField("time", e.target.value)
              }
              placeholder={
                selectedInputLang === "ru"
                  ? "Время приема"
                  : selectedInputLang === "uz"
                    ? "Qabul vaqti"
                    : "Reception Time"
              }
              className='w-full text-[#747474] rounded-[12px] focus:outline-none focus:ring-1 focus:ring-ring py-[18px] pl-[50px] px-[15px] bg-[#F8F8F8]  ' />
            <GoPencil className="absolute text-[#0129E3] left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          </div>
          <div className='relative col-span-full w-full'>
            <YandexMap
              location={location}
              onLocationChange={(coords) => setField("location", coords)} />
          
          </div>


        </div>
        </div>
        <button  className='mt-[15px]  w-full 2xl:w-[220px]  rounded-[12px] border border-[#0129E3] text-[15px] 2xl:text-[16px] text-[#0129E3] font-medium h-[50px]'>

        Добавить место приема

</button>

      </div>


      <div className=' mt-[25px] w-full 2xl:w-[100%] flex items-center 2xl:justify-end'>
        <button  className='bg-[#0129E3] 2xl:w-[245px] py-[20px] w-full rounded-[12px] font-medium text-center text-white'>
          {selectedInputLang === 'ru' ? 'Сохранить изменения' : selectedInputLang === 'uz' ? 'Ozgartirishlarni saqlash' : 'Save changes'}
        </button>
      </div>

    </div>
  );
};

export default DashboardAddress;
