"use client"
import { FC } from 'react'
import Image from 'next/image'
import Mobile from '@/public/action/Mobile.png'
import Tablet from '@/public/action/Tablet.png'
import Desktop from '@/public/action/Desktop.png'

import { useLocale } from 'next-intl'

const FormAction: FC = () => {
  const locale = useLocale()


  return (
    <div className='mt-[80px] mdl:mt-[120px] 2xl:mt-[150px]'>
      <div className='rounded-[20px] p-[20px] slg:p-[40px] 3xl:py-[80px] bg-gradient-to-r relative 2xl:flex 2xl:flex-row  from-[#0129E3]  to-[#229ED9]'>
        <h4 className='text-white text-[24px] leading-[33px] slg:text-[32px] 3xl:text-[40px] slg:leading-[44.8px] 3xl:leading-[56px] font-medium slg:w-[85%] 2xl:w-[85%] '>
          {locale === 'ru'
            ? <>Успейте <br className='slg:hidden' /> зарегистрироваться и <br className='slg:hidden' /> получите преимущества <br className='slg:hidden' /> при старте</>
            : locale === 'uz'
              ? <>Ro'yxatdan <br className='slg:hidden' /> o'tishga ulgurib <br className='slg:hidden' /> boshlang'ich afzalliklarni <br className='slg:hidden' /> qo'lga kiriting</>
              : <>Register <br className='slg:hidden' /> now and gain <br className='slg:hidden' /> advantages at <br className='slg:hidden' /> the start</>}

        </h4>
        <div className='slg:hidden absolute bottom-[80px] right-[30px] w-[30px]'>
          <Image src={Mobile} alt="Image One" width={300} height={300} quality={100} className='w-full h-full object-cover' />
        </div>


        <div className="hidden slg:block 2xl:hidden absolute bottom-[30%] left-[calc(100%-440px)] translate-y-1/2 z-10 w-[100px] lg:w-[140px] max-w-[15%]">
    <Image
      src={Tablet}
      alt="Arrow Image"
      width={300}
      height={300}
      quality={100}
      className="w-full h-auto object-cover"
    />
  </div>

  <div className="hidden 2xl:block absolute bottom-[20%] left-[calc(100%-540px)] translate-y-1/2 z-10 w-[200px] ">
    <Image
      src={Desktop}
      alt="Arrow Image"
      width={300}
      height={300}
      quality={100}
      className="w-full h-auto object-cover"
    />
  </div>



        <div className='w-full 2xl:w-[40%]  mt-[20px] slg:flex slg:items-center slg:justify-end'>
          <button className='py-[16px] bg-white rounded-full flex items-center  text-[#0129E3]  font-bold justify-center px-[18px] w-full slg:w-[280px]'>
            {locale === 'ru' ? "Зарегистрироваться бесплатно" : locale === 'uz' ? "Bepul Ro'yhatdan o'tish" : "Free Register"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default FormAction