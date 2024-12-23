"use client"
import { FC } from 'react'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import AboutImage from '@/public/About.jpg'





const About: FC = () => {
  const locale = useLocale()


  return (
    <div className='mt-[80px] mdl:mt-[120px] 2xl:mt-[150px]'>
      <div className='bg-white flex flex-col 3xl:flex-row 3xl:justify-between px-[20px] 3xl:p-[60px] '>
        <div className='overflow-hidden rounded-br-[60px] rounded-tl-[20px] rounded-bl-[20px] slg:h-[447px] 3xl:w-[48%] 3xl:rounded-br-[100px] '>
          <Image src={AboutImage.src} alt="Image One" width={1000} height={1800} quality={100} className='w-full h-full object-cover' />
        </div>
        <div className='flex flex-col gap-[16px] mt-[20px] slg:mt-[40px] slg:gap-[20px] 3xl:gap-[40px] 3xl:w-[48%] '>
          <h3 className='text-[26px] slg:text-[36px] 3xl:text-[50px] font-medium text-titleDark  '>
            {locale === 'ru'
              ? "Что такое Med Yordam?"
              : locale === 'uz'
                ? "Med Yordam nima?"
                : "What is Med Yordam?"}

          </h3>
          <p className='text-[15px] leading-[21px] text-[#050B2B] slg:text-[16px] slg:leading-[22.4px] 2xl:text-[16px]'>
            {locale === 'ru'
              ? "Med Yordam – это современная платформа, которая объединяет врачей, клиники и пациентов. С ее помощью пациенты могут находить специалистов, основываясь на опыте работы, цене, местоположении и отзывах. Врачи и клиники могут управлять своими профилями, редактировать информацию, менять график работы и публиковать статьи и блоги."
              : locale === 'uz'
                ? "Med Yordam – bu zamonaviy platforma bo'lib, u shifokorlar, klinikalar va bemorlarni birlashtiradi. Uning yordamida bemorlar mutaxassislarni ish tajribasi, narxi, joylashuvi va sharhlarga asoslanib topishlari mumkin. Shifokorlar va klinikalar o'z profillarini boshqarishlari, ma'lumotlarni tahrirlashlari, ish jadvalini o'zgartirishlari va maqolalar hamda bloglar chop etishlari mumkin."
                : "Med Yordam is a modern platform that connects doctors, clinics, and patients. With its help, patients can find specialists based on work experience, price, location, and reviews. Doctors and clinics can manage their profiles, edit information, adjust work schedules, and publish articles and blogs."}


          </p>
          <button className='w-[50%] bg-[#1960EB] py-[16px] rounded-full text-white font-semibold slg:w-[200px]   flex items-center justify-center slg:px-[20px]'>
            {locale === 'ru'
              ? "Подробнее"
              : locale === 'uz'
                ? "Batafsil"
                : "Read more"}


          </button>
        </div>
      </div>
    </div>
  )
}

export default About