"use client"
import { FC } from 'react'
import Image from 'next/image'

import { useLocale } from 'next-intl'
// IMAGES
import One from '@/public/HowWeWork/One.svg'
import Two from '@/public/HowWeWork/Two.svg'
import Three from '@/public/HowWeWork/Three.svg'
import Four from '@/public/HowWeWork/Four.svg'


const Data = [
  {
    id: '1',
    title: { 
      ru: "Регистрация", 
      uz: "Ro‘yxatdan o‘tish", 
      en: "Registration" 
    },
    subtitle: { 
      ru: "Заполните анкету и создайте профиль", 
      uz: "Anketani to‘ldiring va profil yarating", 
      en: "Fill out the form and create a profile" 
    },
    icon: One
  },
  {
    id: '2',
    title: { 
      ru: "Управление профилем", 
      uz: "Profilni boshqarish", 
      en: "Profile management" 
    },
    subtitle: { 
      ru: "Обновляйте информацию, редактируйте контакты и график работы", 
      uz: "Ma’lumotlarni yangilang, kontaktlarni va ish jadvalini tahrirlang", 
      en: "Update information, edit contacts, and work schedule" 
    },
    icon: Two
  },
  {
    id: '3',
    title: { 
      ru: "Связь с пациентами", 
      uz: "Bemorlar bilan aloqa", 
      en: "Communication with patients" 
    },
    subtitle: { 
      ru: "Получайте запросы и записывайте пациентов через платформу и Telegram", 
      uz: "So‘rovlarni qabul qiling va bemorlarni platforma yoki Telegram orqali yozib qo‘ying", 
      en: "Receive requests and schedule patients through the platform or Telegram" 
    },
    icon: Three
  },
  {
    id: '4',
    title: { 
      ru: "Публикации", 
      uz: "E’lonlar", 
      en: "Publications" 
    },
    subtitle: { 
      ru: "Делитесь профессиональными статьями и блогами, чтобы расширить свою аудиторию", 
      uz: "Auditoriyangizni kengaytirish uchun professional maqolalar va bloglarni ulashing", 
      en: "Share professional articles and blogs to expand your audience" 
    },
    icon: Four
  }
];







const HowWeWork: FC = () => {
  type Locale = 'ru' | 'uz' | 'en'

  const locale = useLocale() as Locale



  return (
    <section className='mt-[80px] mdl:mt-[120px] 3xl:mt-[150px]'>

      <h6 className='text-titleDark text-[24px] leading-[33px] slg:text-[32px] 3xl:text-[40px] slg:leading-[44.8px] 3xl:leading-[56px] font-medium slg:w-[85%]  mb-[20px] slg:mb-[40px] 3xl:w-[40%] '>
        {locale === 'ru'
          ? "Как это работает?"
          : locale === 'uz'
            ? "Bu Qanday ishlaydi ?"
            : "How does it work?"}

      </h6>
      <div className='grid grid-cols-1 slg:grid-cols-2  4xl:grid-cols-4 gap-[20px]'>
        {Data.map((item) => (
          <div key={item.id} className='p-[40px] rounded-[20px] hover:bg-gradient-to-r bg-white flex flex-col gap-[16px] group transition duration-500 ease-in-out cursor-pointer from-[#0129E3]  to-[#229ED9]' >
            <div className='w-[48px] h-[48px] group-hover:text-white'>
              <Image
                src={item.icon.src}
                alt="Image One"
                width={48}
                height={48}
                quality={100}
                className='w-full h-full object-cover group-hover:filter group-hover:invert transition duration-300  group-hover:brightness-0 group-hover:sepia-[100%]'
              />
            </div>
            <div className='flex flex-col gap-[8px] group-hover:text-white'>
              <p className='text-[15px] text-[#050B2B] font-medium slg:text-[16px] 2xl:text-[18px] 3xl:text-[20px] ransition duration-300  group-hover:text-white'>
                {item.title[locale]}
              </p>
              <p className='text-[15px] slg:text-[16px] 2xl:text-[18px] 3xl:text-[20px] group-hover:text-white ransition duration-300 group-hover:opacity-[90%] '>
                {item.subtitle[locale]}
              </p>
            </div>
          </div>
        ))}

      </div>


    </section>
  )
}

export default HowWeWork