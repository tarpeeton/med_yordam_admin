import axios from 'axios';
import { useProfileStore } from '@/store/clinick/doctor/profileStore';
import { IUserApplication } from '@/interface/userApplication';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

const ApplicationMessage = () => {
  const [AppLicationData, setApplicationData] = useState<
    IUserApplication[] | []
  >([]);
  const { id } = useProfileStore();
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const res = await axios.get(
          `https://medyordam.result-me.uz/api/application?doctorId=${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setApplicationData(res.data.data);
      } catch (error) {
        console.error('Error fetching application:', error);
      }
    };
    fetchApplication();
  }, []);

  return (
    <div className="p grid grid-cols-1 gap-5 bg-white 2xl:px-6 2xl:py-[35px]">
      {AppLicationData.map((item, index) => (
        <div
          key={index}
          className="rounded-xl border border-[EDEDED] px-[16px] py-[25px]"
        >
          <p className="text-[15px] text-[#747474]">
            {item.createdDate
              ? dayjs(item.createdDate).format('DD.MM.YYYY')
              : 'No Date'}
          </p>
          <div className="flex flex-col gap-[20px] lg:mt-5 lg:flex-row lg:gap-[120px]">
            <p className="text-base text-[#050B2B] lg:text-xl">{item.name}</p>
            <Link
              href={`tel:${item.phoneNumber}`}
              className="text-base text-[#050B2B] lg:text-xl"
            >
              {item.phoneNumber}
            </Link>
          </div>
          <div className="mt-5 whitespace-pre-wrap rounded-xl bg-[#F8F8F8] p-6 2xl:p-7 2xl:text-[19px]">
            {item.comment}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ApplicationMessage;
