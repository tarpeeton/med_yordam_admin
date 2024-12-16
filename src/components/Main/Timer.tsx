"use client"

import { useLocale } from 'next-intl'
import { useEffect, useState } from 'react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}





export default function CountdownTimer() {
  type Locale = 'ru' | 'uz' | 'en'
  const locale = useLocale() as Locale


  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 13,
    hours: 2,
    minutes: 10,
    seconds: 28,
  })
  const TimerData = [
    { value: timeLeft.days, label: { ru: 'Дня', uz: 'Kun', en: 'Days' } },
    { value: timeLeft.hours, label: { ru: 'Часа', uz: 'Soat', en: 'Hours' } },
    { value: timeLeft.minutes, label: { ru: 'Минут', uz: 'Daqiqa', en: 'Minutes' } },
    { value: timeLeft.seconds, label: { ru: 'Секунд', uz: 'Soniya', en: 'Seconds' } }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newSeconds = prevTime.seconds - 1
        if (newSeconds >= 0) return { ...prevTime, seconds: newSeconds }

        const newMinutes = prevTime.minutes - 1
        if (newMinutes >= 0) return { ...prevTime, minutes: newMinutes, seconds: 59 }

        const newHours = prevTime.hours - 1
        if (newHours >= 0) return { ...prevTime, hours: newHours, minutes: 59, seconds: 59 }

        const newDays = prevTime.days - 1
        if (newDays >= 0) return { days: newDays, hours: 23, minutes: 59, seconds: 59 }

        clearInterval(timer)
        return prevTime
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="mt-[80px] slg:mt-[120px] 3xl:mt-[150px]">
      <h2 className='mb-[20px] slg:mb-[40px] 3xl:mb-[32px] text-[24px] slg:text-[36px] 3xl:text-[50px] font-medium'>


        {locale === 'ru'
          ? "Осталось до запуска"
          : locale === 'uz'
            ? "Ishga tushirishgacha vaqt qoldi"
            : "Time left until launch"}

      </h2>
      <div className='bg-gradient-to-br from-[#1E90DA] via-[#2A4EF7] via-[#0129E3] to-[#001CA1] 3xl:py-[80px] py-[40px] rounded-[20px] flex items-center justify-center'>
        <div className="flex items-center gap-2">
          {TimerData.map((item, index) => (
            <div key={index} className="flex flex-col items-center ">
              {/* Taymer Box */}
              <div className="relative w-[75px] h-[76px] 3xl:w-[240px] 3xl:h-[240px] flex items-center justify-center bg-[#2246EA]  shadow-[0_8px_32px_rgba(31,38,135,0.37)] backdrop-blur-[7.5px] border border-white/10 rounded-[16px] slg:w-[160px] slg:h-[160px] ">
                <span className="3xl:text-[120px] slg:text-[96px] text-[40px] font-light text-white tabular-nums">
                  {item.value.toString().padStart(2, '0')}
                </span>

                {/* Horizontal Divider Line */}
                <div className="absolute top-1/2 left-0 w-full h-[3px] bg-[#1A3EE6] border border-[#1A3EE6] shadow-[0_4px_4px_rgba(0,0,0,0.25)] -translate-y-1/2" />


                {/* Vertical Divider Line */}
              </div>
              <span className="mt-4 text-[#4AFCDC] text-xl">{item.label[locale]}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
