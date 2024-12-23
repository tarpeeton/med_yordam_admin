"use client"
import { FC } from 'react'
import Image from 'next/image'

import One from '../../public/BannerImage/One.jpg'
import Two from '../../public/BannerImage/Two.jpg'
import Three from '../../public/BannerImage/Three.jpg'
import Four from '../../public/BannerImage/Four.jpg'


import { useLocale } from 'next-intl'

const Banner: FC = () => {
  const locale = useLocale()


  return (
    <div className='mt-[80px] mdl:mt-[120px] 2xl:mt-[150px]'>
      <div className='flex flex-col slg:flex-row slg:justify-between'>
        <div className='flex flex-row flex-wrap slg:w-[47%]  justify-between'>
          <div className='rounded-bl-[30px] rounded-tr-[30px] overflow-hidden w-[47%] h-[135px]  mt-[13px] 2xl:h-[200px]'>
            <Image src={One.src} alt="Image One" width={300} height={300} quality={100} className='w-full h-full object-cover' />
          </div>
          <div className='rounded-bl-[30px] rounded-tr-[30px] overflow-hidden w-[47%] h-[135px] 2xl:h-[200px] '>
            <Image src={Two.src} alt="Image One" width={300} height={300} quality={100} className='w-full h-full object-cover' />
          </div>
          <div className='rounded-bl-[30px] rounded-tr-[30px] overflow-hidden w-[47%] h-[135px] mt-[13px] 2xl:h-[200px]'>
            <Image src={Three.src} alt="Image One" width={300} height={300} quality={100} className='w-full h-full object-cover' />
          </div>
          <div className='rounded-bl-[30px] rounded-tr-[30px] overflow-hidden w-[47%] h-[135px]  mt-[13px] 2xl:h-[200px]'>
            <Image src={Four.src} alt="Image One" width={300} height={300} quality={100} className='w-full h-full object-cover' />
          </div>
        </div>
        <div className="mt-[20px] slg:w-[50%] slg:mt-0 flex flex-col gap-[16px] slg:gap-[24px] slg:order-[-1]">
          <h1 className='text-titleDark font-medium tracking-[-2%] text-[32px] leading-[33.6px] slg:text-[30px] slg:leading-[42px] 2xl:text-[60px]  2xl:leading-[63px]'>
            <span className='text-[#0129E3]'>Med Yordam -</span>
            {locale === 'ru' ? "Простой и удобный сервис для врачей и клиник" : locale === 'uz' ? "Shifokorlar va klinikalar uchun oddiy va qulay xizmat" : "A simple and convenient service for doctors and clinics"}

          </h1>
          <p className='text-[15px] leading-[21px] text-[#050B2B] slg:text-[16px] slg:leading-[22.4px] 2xl:text-[16px]'>
          {locale === 'ru' ? "Присоединяйтесь к новой платформе для врачей и клиник, чтобы предоставить пациентам легкий доступ к вашему профилю и услугам" : locale === 'uz' ? "Yangi platformaga qo'shiling, shifokorlar va klinikalar uchun bemorlarga profil va xizmatlaringizga oson kirish imkoniyatini taqdim etish uchun" : "Join the new platform for doctors and clinics to provide patients easy access to your profile and services"}

          </p>
          <button className='w-[80%] bg-[#1960EB] py-[16px] rounded-full text-white font-semibold slg:w-[80%] 2xl:w-[65%] 3xl:w-[45%] flex items-center justify-center px-[20px]'>
          {locale === 'ru' ? "Зарегистрироваться бесплатно" : locale === 'uz' ? "Bepul Ro'yhatdan o'tish" : "Free Register"}

          </button>
        </div>
      </div>
    </div>
  )
}

export default Banner