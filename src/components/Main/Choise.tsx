"use client"
import { FC } from 'react'
import Image from 'next/image'

import { useLocale } from 'next-intl'
// IMAGES
import One from '@/public/choise/One.svg'
import Two from '@/public/choise/Two.svg'
import Three from '@/public/choise/Three.svg'
import Four from '@/public/choise/Four.svg'











const WhyChoise: FC = () => {
  const locale = useLocale()


  return (
    <div className='mt-[80px] mdl:mt-[120px] 3xl:mt-[150px]'>

      <h6 className='text-titleDark text-[24px] leading-[33px] slg:text-[32px] 3xl:text-[40px] slg:leading-[44.8px] 3xl:leading-[56px] font-medium slg:w-[85%]  mb-[20px] slg:mb-[40px] 3xl:w-[40%] '>
        {locale === 'ru'
          ? "Почему Med Yordam - это ваш выбор"
          : locale === 'uz'
            ? "Nima uchun Med Yordam sizning tanlovingiz"
            : "Why Med Yordam is your Choice"}

      </h6>

      <div className='flex flex-col slg:flex-row slg:flex-wrap slg:justify-between'>
        <div className="grid grid-cols-2 gap-[10px] w-[90%] slg:w-[50%] 3xl:gap-[40px] mx-auto slg:grid-cols-2 slg:h-[330px]  slg:mt-[100px]">
          {/* 1-karta */}
          <div className="slg:h-[150px] flex items-center justify-center bg-[#379FF2] w-full h-[100px] slg:min-w-[170px] rounded-tr-[35px] rounded-bl-[35px] slg:rounded-tr-[90px] slg:rounded-bl-[90px] 3xl:h-[210px] ">
            <div className="w-[32px] h-[32px] text-white 3xl:w-[72px] 3xl:h-[72px]">
              <Image width={32} height={32} quality={100} src={One.src} alt="Heart Icon" className="w-full h-full" />
            </div>
          </div>

          {/* 2-karta */}
          <div className="slg:h-[150px] slg:rounded-tl-[90px]  slg:rounded-br-[90px] flex items-center justify-center bg-[#0129E3] w-full h-[90px] slg:min-w-[170px] rounded-tl-[30px] rounded-br-[30px] 3xl:h-[210px] ">
            <div className="w-[32px] h-[32px] text-white 3xl:w-[72px] 3xl:h-[72px]">
              <Image width={32} height={32} quality={100} src={Two.src} alt="Plus Icon" className="w-full h-full" />
            </div>
          </div>

          {/* 3-karta */}
          <div className="slg:h-[150px] slg:rounded-tl-[90px]  slg:rounded-br-[90px]  flex items-center justify-center bg-[#0129E3] w-full h-[90px] slg:min-w-[170px] rounded-tl-[30px] rounded-br-[30px] 3xl:h-[210px] ">
            <div className="w-[32px] h-[32px] text-white 3xl:w-[72px] 3xl:h-[72px]">
              <Image width={32} height={32} quality={100} src={Three.src} alt="Hospital Icon" className="w-full h-full" />
            </div>
          </div>

          {/* 4-karta */}
          <div className="slg:h-[150px] slg:rounded-tr-[90px] slg:rounded-bl-[90px] flex items-center justify-center bg-[#379FF2] w-full h-[100px] slg:min-w-[170px] rounded-tr-[35px] rounded-bl-[35px] 3xl:h-[210px] ">
            <div className="w-[32px] h-[32px] text-white 3xl:w-[72px] 3xl:h-[72px]">
              <Image width={32} height={32} quality={100} src={Four.src} alt="Ambulance Icon" className="w-full h-full" />
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-[8px] mt-[20px] slg:order-[-1] slg:w-[185px] 3xl:w-[250px]'>
          <p className='text-[#050B2B] text-[18px] slg:text-[20px] 3xl:text-[24px]'>
            Доступ к пациентам
          </p>
          <p className='text-[#747474] leading-[21px] slg:leading-[22px] 3xl:leading-[28px] text-[15px] slg:text-[16px] 3xl:text-[20px]'>
            Пациенты смогут находить вас через платформу и записываться на прием.
          </p>
        </div>
        <div className='flex flex-col gap-[8px] mt-[20px] slg:w-[185px] 3xl:w-[250px] '>
          <p className='text-[#050B2B] text-[18px] slg:text-[20px] 3xl:text-[24px]'>
            Доступ к пациентам
          </p>
          <p className='text-[#747474] leading-[21px] slg:leading-[22px] 3xl:leading-[28px] text-[15px] slg:text-[16px] 3xl:text-[20px]'>
            Пациенты смогут находить вас через платформу и записываться на прием.
          </p>
        </div>
        <div className='flex flex-col gap-[8px] mt-[20px] slg:w-[185px] slg:mt-[-120px] 3xl:w-[250px] 3xl:mt-[50px] 4xl:mt-[300px]'>
          <p className='text-[#050B2B] text-[18px] slg:text-[20px] 3xl:text-[24px]'>
            Доступ к пациентам
          </p>
          <p className='text-[#747474] leading-[21px] slg:leading-[22px] 3xl:leading-[28px] text-[15px] slg:text-[16px] 3xl:text-[20px]'>
            Пациенты смогут находить вас через платформу и записываться на прием.
          </p>
        </div>
        <div className='flex flex-col gap-[8px] mt-[20px] slg:w-[185px] slg:mt-[-120px] 3xl:w-[250px] 3xl:mt-[50px] '>
          <p className='text-[#050B2B] text-[18px] slg:text-[20px] 3xl:text-[24px]'>
            Доступ к пациентам
          </p>
          <p className='text-[#747474] leading-[21px] slg:leading-[22px] 3xl:leading-[28px] text-[15px] slg:text-[16px] 3xl:text-[20px]'>
            Пациенты смогут находить вас через платформу и записываться на прием.
          </p>
        </div>
      </div>

    </div>
  )
}

export default WhyChoise