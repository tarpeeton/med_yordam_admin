"use client"
import { FC } from 'react'
import Image from 'next/image'

import { useLocale } from 'next-intl'


import One from '@/public/invite/One.svg'
import Two from '@/public/invite/Two.svg'
import Three from '@/public/invite/Three.svg'
import Four from '@/public/invite/Four.svg'
import TgBotImage from '@/public/TGBOT.png'
import { Link } from '@/i18n/routing'




const Data = [
  { id: "1", title: { ru: "Удобство использования", uz: "", en: "" }, icon: One },
  { id: "2", title: { ru: "Повышение видимости", uz: "", en: "" }, icon: Two },
  { id: "3", title: { ru: "Быстрая настройка", uz: "", en: "" }, icon: Three },
  { id: "4", title: { ru: "Абсолютно бесплатно", uz: "", en: "" }, icon: Four },
]





const Invite: FC = () => {
  type Locale = 'ru' | 'uz' | 'en'

  const locale = useLocale() as Locale


  return (
    <div className='mt-[80px] mdl:mt-[120px] 2xl:mt-[150px]'>
      <div className='rounded-[20px] p-[20px] slg:p-[40px] 4xl:p-[80px] bg-gradient-to-r  from-[#0129E3] via-[#1264DE] via-[#0946E1] to-[#229ED9] '>
        <div>
          <p className='text-[#FFFFFF] text-[32px] leading-[33px] slg:text-[40px] 3xl:text-[50px] slg:leading-[44.8px] 3xl:leading-[56px] font-medium  mb-[20px] slg:mb-[40px]'>
            {locale === 'ru'
              ? <>Переходите в <br className='slg:hidden' /> Telegram-бот</>
              : locale === 'uz'
                ? ""
                : ""}


          </p>
          <div className='flex flex-col slg:flex-row slg:flex-wrap'>
            <div className='flex flex-col gap-[12px] slg:gap-[20px] 2xl:gap-[16px] slg:w-[50%]'>
              {Data.map((item) => (
                <div key={item.id} className='flex items-center  flex-row gap-[16px]'>
                  <div className='flex w-[40px] h-[40px] items-center relative justify-center rounded-tr-[15px] 2xl:w-[56px] 2xl:h-[56px] rounded-bl-[15px] bg-[#FFFFFF33] slg:w-[48px] slg:h-[48px]'>
                    <div className='w-[32px]  h-[32px] slg:w-[40px] slg:h-[40px] 2xl:w-[48px] absolute 2xl:h-[48px]  top-[16px] left-[16px] z-10'>
                      <Image src={item.icon} width={48} height={48} quality={100} alt='icon' className='w-full h-full object-cover' />
                    </div>
                  </div>
                  <div>
                    <p className='text-[#FFFFFF] text-[18px] slg:text-[20px] 2xl:text-[24px]'>
                      {locale === 'ru'
                        ? item.title.ru
                        : locale === 'uz'
                          ? item.title.uz
                          : item.title.en}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className='flex flex-col slg:w-[50%] '>
              <div className='slg:h-[320px] 4xl:h-[500px] 4xl:mt-[-150px]'>
                <Image src={TgBotImage} alt='TgBotImage' width={300} height={300} quality={100} className='w-full h-full object-cover' />
              </div>
             
            </div>
            <div className='w-full slg:mt-[40px]  2xl:mt-[-100px] 4xl:mt-[-120px]'>
                <div className='py-[16px] w-[90%]  2xl:w-[240px] slg:w-[40%] mx-auto flex items-center justify-center font-bold text-[16px]  rounded-full  bg-white text-[#0129E3]'>
                  Перейти к боту
                </div>

              </div>
          </div>

        </div>


      </div>



    </div>
  )
}

export default Invite