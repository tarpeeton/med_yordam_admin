"use client"
import { FC } from 'react'
import Image from 'next/image'
import Mobile from '@/public/action/Mobile.png'
import Tablet from '@/public/action/Tablet.png'
import desktop from '@/public/action/Desktop.png'

import { useLocale } from 'next-intl'

const FormAction: FC = () => {
  const locale = useLocale()


  return (
    <div className='mt-[80px] mdl:mt-[120px] 2xl:mt-[150px]'>
      <div className='rounded-[20px] p-[20px] slg:p-[40px] 3xl:py-[80px] bg-gradient-to-r relative  from-[#0129E3] via-[#1264DE] via-[#229ED9] to-[#229ED9]'>
        <h4 className='text-white text-[24px] leading-[33px] slg:text-[32px] 3xl:text-[40px] slg:leading-[44.8px] 3xl:leading-[56px] font-medium '>
          {locale === 'ru'
            ? <>Успейте <br className='slg:hidden' /> зарегистрироваться и <br className='slg:hidden' /> получите преимущества <br className='slg:hidden' /> при старте</>
            : locale === 'uz'
              ? <>Ro'yxatdan <br className='slg:hidden' /> o'tishga ulgurib <br className='slg:hidden' /> boshlang'ich afzalliklarni <br className='slg:hidden' /> qo'lga kiriting</>
              : <>Register <br className='slg:hidden' /> now and gain <br className='slg:hidden' /> advantages at <br className='slg:hidden' /> the start</>}

        </h4>
        <div className='slg:hidden absolute top-[50px] right-[20px]'>
          <Image src={Mobile} alt="Image One" width={300} height={300} quality={100} className='w-full h-full object-cover' />
        </div>
        <div className='w-full  mt-[20px]'>
          <button className='py-[16px] bg-white rounded-full flex items-center  text-[#0129E3]  font-bold justify-center px-[18px]'>
            {locale === 'ru' ? "Зарегистрироваться бесплатно" : locale === 'uz' ? "Bepul Ro'yhatdan o'tish" : "Free Register"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default FormAction