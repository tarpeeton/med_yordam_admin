'use client';
import { ILangTopProps } from '@/interface/langtopProps';
import { useClinicProfileStore } from '@/store/clinick/profile';
import { useProfileStore } from '@/store/clinick/doctor/profileStore';

export const AllDoctors = ({ selectedInputLang }: ILangTopProps) => {
  const { doctors } = useClinicProfileStore();
  const { refreshDoctorData, getAllDataWithSlug } = useProfileStore();
  const slugDoctor = localStorage.getItem('slug-doctor');

  const handleDoctorSlugToStore = (slug: string) => {
    localStorage.setItem('slug-doctor', slug);
    getAllDataWithSlug(slug);
  };

  const handleNewDoctor = () => {
    localStorage.removeItem('slug-doctor');
    refreshDoctorData();
  };

  return (
    <section className="mt-5 grid grid-cols-2 gap-3 2xl:grid-cols-6 2xl:gap-5">
      {doctors.map((doctor, index) => (
        <button
          onClick={() => handleDoctorSlugToStore(doctor.slug)}
          key={index}
          className={`${slugDoctor === doctor.slug ? 'border-none bg-[#0129E3] font-medium text-white' : ''} flex items-center justify-center rounded-lg border border-gray-500 py-3`}
        >
          {doctor.name[selectedInputLang]}
        </button>
      ))}
      <button
        onClick={handleNewDoctor}
        className={`flex items-center justify-center rounded-lg border border-[#0129E3] py-3 font-medium text-[#0129E3]`}
      >
        {selectedInputLang === 'ru'
          ? 'Добавить еще врача'
          : selectedInputLang === 'uz'
            ? " Yana shifokor qo'shish"
            : 'Add another doctor'}
      </button>
    </section>
  );
};
