"use client";
import { FC } from 'react';
import Image from 'next/image';
import { FaPhoneAlt } from "react-icons/fa";
import Instagram from '@/public/instagram.svg'
import { useServiceStore } from '@/store/createServiceStore';
import { GoPencil } from "react-icons/go";
import { IoClose } from "react-icons/io5";

interface ILinksProps {
  selectedInputLang: "ru" | "uz" | "en";
}



const DashboardServices: FC<ILinksProps> = ({ selectedInputLang }) => {

  const {
    services,
    newService,
    setNewServiceName,
    setNewServicePrice,
    addService,
    updateServiceField,
    deleteService,
    save,
  } = useServiceStore();



  return (
    <div className='mt-[25px] 2xl:mt-[37px]'>
      <div className='flex flex-col 2xl:flex-row 2xl:gap-[2%] 2xl:flex-wrap'>



        {/* inputs */}
        <div className='flex flex-col mt-[20px] 2xl:mt-0 rounded-[18px] gap-[12px] 2xl:gap-[20px] p-[15px] 2xl:py-[37px] 2xl:px-[25px] bg-white w-full'>
          <div className='flex flex-col gap-[12px] 2xl:gap-[15px]'>
            {services.map((item) => (
              <div key={item.id} className='flex flex-col    2xl:flex-row 2xl:items-center 2xl:justify-between'>
                <div className='flex flex-row items-center  gap-[8px] text-[17px] text-[#0129E3] 2xl:order-1 w-[25px] h-[25px]'>
                  <p className='2xl:hidden font-medium'>
                    Услуга
                  </p>
                  <button onClick={() => deleteService(item.id)} className='text-[#0129E3] 2xl:text-[] text-[]'>
                    <IoClose className='w-[20px] h-[20px] 2xl:w-[25px] 2xl:h-[25px]' />
                  </button>
                </div>
                <div className='relative  2xl:w-[48%]'>
                  <input
                    value={item.name[selectedInputLang]}
                    onChange={(e) =>
                      updateServiceField(item.id, "name", selectedInputLang, e.target.value)
                    }
                    placeholder={
                      selectedInputLang === "ru"
                        ? "Название услуги"
                        : selectedInputLang === "uz"
                          ? "Xizmat nomi"
                          : "Service Name"
                    }
                    className='w-full text-[#747474] rounded-[12px] focus:outline-none focus:ring-1 focus:ring-ring py-[18px] pl-[50px] px-[15px] bg-[#F8F8F8]  ' />
                  <GoPencil className="absolute text-[#0129E3] left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                </div>
                <div className='relative  2xl:w-[48%]'>
                  <input
                    value={item.price}
                    onChange={(e) =>
                      updateServiceField(item.id, "price", null, e.target.value)
                    }
                    placeholder={
                      selectedInputLang === "ru"
                        ? "Цена"
                        : selectedInputLang === "uz"
                          ? "Narxi"
                          : "Price"
                    }
                    className='w-full text-[#747474] rounded-[12px] focus:outline-none focus:ring-1 focus:ring-ring py-[18px] pl-[50px] px-[15px] bg-[#F8F8F8]  ' />
                  <GoPencil className="absolute text-[#0129E3] left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                </div>
              </div>


            ))}

          </div>





          <button onClick={addService} className='mt-[15px]  w-full 2xl:w-[220px]  rounded-[12px] border border-[#0129E3] text-[15px] 2xl:text-[16px] text-[#0129E3] font-medium h-[50px]'>

            Добавить услугу

          </button>

        </div>
        {/* BUTTON SAVE */}
        <div className='2xl:order-[3] mt-[25px] w-full 2xl:w-[100%] flex items-center 2xl:justify-end'>
          <button onClick={save} className='bg-[#0129E3] 2xl:w-[235px] py-[20px] w-full rounded-[12px] font-medium text-center text-white'>
            {selectedInputLang === 'ru' ? 'Сохранить' : selectedInputLang === 'uz' ? 'Saqlash' : 'Save'}
          </button>
        </div>
      </div>

    </div>
  )
}

export default DashboardServices
