import axios from 'axios';
import { multiLang } from '@/interface/multiLang';
// Zustand store
import { create } from 'zustand';
import { useProfileStore } from '@/store/clinick/doctor/profileStore';
import { useClinicProfileStore } from '../profile';
import { transformAchievements } from './profileStore';

export type Language = 'ru' | 'uz' | 'en';

interface Specialty {
  id: number;
  name: multiLang;
  selected: boolean;
}

interface LanguageSkill {
  id: number;
  code: string;
  value: string;
  selected: boolean;
}

export interface Achievement {
  ru: string[];
  uz: string[];
  en: string[];
}

interface Education {
  id: number | null | undefined;
  name: multiLang;
  faculty: multiLang;
  fromYear: string | null;
  toYear: string | null;
  direction?: string;
}

interface Quote {
  ru: string;
  uz: string;
  en: string;
}

interface WorkExperience {
  id: number | null | undefined;
  name: multiLang;
  city: multiLang;
  fromYear: string;
  toYear: string;
  position: {
    ru: string[];
    uz: string[];
    en: string[];
  };
}

interface ProInfoState {
  specialties: Specialty[];
  languages: LanguageSkill[];
  achievement: Achievement[];
  quote: Quote;
  educations: Education[];
  workExperiences: WorkExperience[];
  success: boolean;
  selectedUserSpecialties: number[];
  selectedUserLanguages: number[];
  // Specialty methods
  toggleSpecialty: (id: number) => void;
  // Language methods
  toggleLanguage: (id: number) => void;

  // Achievement methods
  addAchievement: () => void;

  // Education methods
  addEducation: () => void;
  setSuccess: (success: boolean) => void;
  updateEducationField: (
    index: number,
    field: 'name' | 'faculty' | 'fromYear' | 'toYear',
    lang: Language | null,
    value: string
  ) => void;
  removeEducation: (id: number) => void;
  updateAchievementField: (
    index: number,
    lang: Language,
    value: string
  ) => void;
  updateQuote: (lang: Language, value: string) => void;
  // Work experience methods
  addWorkExperience: () => void;
  updateWorkExperienceFieldByIndex: (
    index: number,
    field: keyof WorkExperience,
    lang: Language | null,
    value: string | number
  ) => void;
  addPositionToWorkExperience: (index: number, lng: Language) => void;
  updatePositionInWorkExperience: (
    index: number,
    positionIndex: number,
    lang: Language,
    value: string
  ) => void;
  removePositionFromWorkExperience: (
    index: number,
    positionIndex: number
  ) => void;
  removeWorkExperience: (id: number) => void;
  // Save method
  save: () => Promise<boolean>;
  fetchSpecialties: () => Promise<void>;
  fetchLanguage: () => Promise<void>;
  setAllData: (
    workExperiences: WorkExperience[],
    educations: Education[],
    languages: LanguageSkill[],
    specialties: Specialty[],
    achievements: Achievement[],
    quote: Quote
  ) => void;
}

export const useProInfoStore = create<ProInfoState>((set, get) => ({
  success: false,
  specialties: [],
  languages: [],
  selectedUserSpecialties: [],
  selectedUserLanguages: [],
  specialtiesFinished: false,
  quote: { ru: '', uz: '', en: '' },
  achievement: [{ ru: [''], uz: [''], en: [''] }],
  educations: [
    {
      id: null,
      name: { ru: 'Университет', uz: 'Universitet', en: 'University' },
      faculty: { ru: 'Информатика', uz: 'Informatika', en: 'Computer Science' },
      fromYear: '2015',
      toYear: '2019',
    },
  ],
  workExperiences: [
    {
      id: null,
      name: { ru: 'Компания X', uz: 'Kompaniya X', en: 'Company X' },
      city: { ru: 'Москва', uz: 'Moskva', en: 'Moscow' },
      fromYear: '2020',
      toYear: '2023',
      position: {
        ru: ['Разработчик'],
        uz: ['Dasturchi'],
        en: ['Developer'],
      },
    },
  ],

  setSuccess: (success) => set({ success }),

  toggleSpecialty: (id) => {
    set((state) => ({
      specialties: state.specialties.map((specialty) =>
        specialty.id === id
          ? { ...specialty, selected: !specialty.selected }
          : specialty
      ),
    }));
  },

  updateQuote: (lang, value) => {
    set((state) => ({
      quote: { ...state.quote, [lang]: value },
    }));
  },

  toggleLanguage: (id) => {
    set((state) => ({
      languages: state.languages.map((language) =>
        language.id === id
          ? { ...language, selected: !language.selected }
          : language
      ),
    }));
  },

  setSelectedSpecialties: () => {
    const { specialties, selectedUserSpecialties } = get();
    const updatedSpecialties = specialties.map((specialty) =>
      selectedUserSpecialties.includes(specialty.id)
        ? { ...specialty, selected: true }
        : { ...specialty, selected: false }
    );

    set({ specialties: updatedSpecialties });
  },

  addAchievement: () => {
    set((state) => ({
      achievement: [...state.achievement, { ru: [''], uz: [''], en: [''] }],
    }));
  },

  updateAchievementField: (index: number, lang: Language, value: string) => {
    set((state) => ({
      achievement: state.achievement.map((achievement, i) =>
        i === index
          ? {
              ...achievement,
              [lang]: achievement[lang].map((_, idx) =>
                idx === 0 ? value : _
              ),
            }
          : achievement
      ),
    }));
  },

  addEducation: () => {
    set((state) => ({
      educations: [
        ...state.educations,
        {
          id: null,
          name: { ru: '', uz: '', en: '' },
          faculty: { ru: '', uz: '', en: '' },
          fromYear: '',
          toYear: '',
        },
      ],
    }));
  },

  updateEducationField: (
    index: number | null,
    field: 'name' | 'faculty' | 'fromYear' | 'toYear',
    lang: Language | null,
    value: string
  ) => {
    set((state) => ({
      educations: state.educations.map((education, indexSome) =>
        indexSome === index
          ? {
              ...education,
              [field]: lang
                ? { ...(education[field] as multiLang), [lang]: value }
                : value,
            }
          : education
      ),
    }));
  },

  removeEducation: (id) => {
    set((state) => ({
      educations: state.educations.filter((education) => education.id !== id),
    }));
  },

  addWorkExperience: () => {
    set((state) => ({
      workExperiences: [
        ...state.workExperiences,
        {
          id: null,
          name: { ru: '', uz: '', en: '' },
          city: { ru: '', uz: '', en: '' },
          fromYear: '',
          toYear: '',
          position: {
            ru: [''],
            uz: [''],
            en: [''],
          },
        },
      ],
    }));
  },

  updateWorkExperienceFieldByIndex: (
    index: number,
    field: keyof WorkExperience,
    lang: Language | null,
    value: string | number
  ) => {
    set((state) => ({
      workExperiences: state.workExperiences.map((experience, idx) =>
        idx === index
          ? {
              ...experience,
              [field]: lang
                ? { ...(experience[field] as multiLang), [lang]: value }
                : value,
            }
          : experience
      ),
    }));
  },

  addPositionToWorkExperience: (index) => {
    set((state) => ({
      workExperiences: state.workExperiences.map((experience, expIndex) =>
        expIndex === index
          ? {
              ...experience,
              position: {
                ...experience.position,
                ru: [...(experience.position?.ru ?? []), ''],
                uz: [...(experience.position?.uz ?? []), ''],
                en: [...(experience.position?.en ?? []), ''],
              },
            }
          : experience
      ),
    }));
  },

  updatePositionInWorkExperience: (index, positionIndex, lang, value) => {
    set((state) => ({
      workExperiences: state.workExperiences.map((experience, indexExp) => {
        if (index === indexExp) {
          return {
            ...experience,
            position: {
              ...experience.position,
              [lang]: experience.position[lang].map((position, index) =>
                index === positionIndex ? value : position
              ),
            },
          };
        }
        return experience;
      }),
    }));
  },

  removePositionFromWorkExperience: (index, positionIndex) => {
    set((state) => ({
      workExperiences: state.workExperiences.map((experience, expIndex) =>
        expIndex === index
          ? {
              ...experience,
              position: {
                ...experience.position,
                ru: experience.position.ru.filter(
                  (_, index) => index !== positionIndex
                ),
              },
            }
          : experience
      ),
    }));
  },

  removeWorkExperience: (id) => {
    set((state) => ({
      workExperiences: state.workExperiences.filter(
        (experience) => experience.id !== id
      ),
    }));
  },

  fetchSpecialties: async () => {
    try {
      const response = await axios.get(
        'https://medyordam.result-me.uz/api/speciality',
        {
          headers: { 'Accept-Language': '' },
        }
      );

      const currentSelectedIds = get().selectedUserSpecialties;

      const specialties = response.data.data.map(
        (specialty: { id: number; name: multiLang; active: boolean }) => ({
          ...specialty,
          selected: currentSelectedIds.includes(specialty.id), // Check if the specialty ID is in the selected list
        })
      );

      set({ specialties });
    } catch (error) {
      console.error('Error fetching specialties:', error);
    }
  },

  fetchLanguage: async () => {
    try {
      const response = await axios.get(
        'https://medyordam.result-me.uz/api/language'
      );
      const currentSelectedIds = get().selectedUserLanguages;

      const languages = response.data.data.map(
        (language: { id: number; name: multiLang; active: boolean }) => ({
          ...language,
          selected: currentSelectedIds.includes(language.id), // Check if the specialty ID is in the selected list
        })
      );
      set({ languages });
    } catch (error) {
      console.error('Error fetching specialties:', error);
    }
  },

  save: async (): Promise<boolean> => {
    const state = get();
    const token = sessionStorage.getItem('token');
    try {
      // =========
      // Achievements Transformation
      // =========
      const achievementsTransformed = {
        uz: state.achievement.map((achie) => achie.uz[0]).filter(Boolean),
        ru: state.achievement.map((achie) => achie.ru[0]).filter(Boolean),
        en: state.achievement.map((achie) => achie.en[0]).filter(Boolean),
      };

      const educationTransformed = state.educations.map((education) => {
        const isEmptyName =
          !education.name.ru && !education.name.uz && !education.name.en;
        const isEmptyFaculty =
          !education.faculty.ru &&
          !education.faculty.uz &&
          !education.faculty.en;
        const isEmptyYears =
          (!education.fromYear || Number(education.fromYear) === 0) &&
          (!education.toYear || Number(education.toYear) === 0);

        if (isEmptyName && isEmptyFaculty && isEmptyYears) {
          return { id: education.id };
        }

        return {
          id: education.id,
          name: {
            ru: education.name.ru,
            uz: education.name.uz,
            en: education.name.en,
          },
          faculty: {
            ru: education.faculty.ru,
            uz: education.faculty.uz,
            en: education.faculty.en,
          },
          fromYear: Number(education.fromYear),
          toYear: Number(education.toYear),
        };
      });

      const experienceTransformed = state.workExperiences.map((experience) => {
        const nameRu = experience.name?.ru || '';
        const nameUz = experience.name?.uz || '';
        const nameEn = experience.name?.en || '';

        const cityRu = experience.city?.ru || '';
        const cityUz = experience.city?.uz || '';
        const cityEn = experience.city?.en || '';

        const posRu = (experience.position?.ru || []).filter(Boolean);
        const posUz = (experience.position?.uz || []).filter(Boolean);
        const posEn = (experience.position?.en || []).filter(Boolean);

        const isEmptyName = !nameRu && !nameUz && !nameEn;
        const isEmptyCity = !cityRu && !cityUz && !cityEn;
        const isEmptyPosition = !posRu.length && !posUz.length && !posEn.length;
        const isEmptyYears =
          (!experience.fromYear || Number(experience.fromYear) === 0) &&
          (!experience.toYear || Number(experience.toYear) === 0);

        if (isEmptyName && isEmptyCity && isEmptyPosition && isEmptyYears) {
          return { id: experience.id };
        }

        return {
          id: experience.id ?? null,
          name: {
            ru: nameRu,
            uz: nameUz,
            en: nameEn,
          },
          city: {
            ru: cityRu,
            uz: cityUz,
            en: cityEn,
          },
          position: {
            ru: posRu,
            uz: posUz,
            en: posEn,
          },
          fromYear: Number(experience.fromYear),
          toYear: Number(experience.toYear),
        };
      });

      const specialitiesSelected = state.specialties
        .filter((specialty) => specialty.selected)
        .map((specialty) => specialty.id);

      const languagesSelected = state.languages
        .filter((language) => language.selected)
        .map((language) => language.id);

      const formData = new FormData();
      const doctorID = useProfileStore.getState().id;
      const { id } = useClinicProfileStore.getState();

      const payload = {
        id: doctorID,
        achievement: achievementsTransformed,
        education: educationTransformed,
        speciality: specialitiesSelected,
        language: languagesSelected,
        experience: experienceTransformed,
        quote: state.quote,
      };

      formData.append('json', JSON.stringify(payload));
      formData.append('clinicId', String(id));

      const res = await axios.put(
        'https://medyordam.result-me.uz/api/clinic/update-doctor',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Accept-Language': '',
          },
        }
      );

      const {
        experience,
        education,
        language,
        speciality,
        achievement,
        quote,
      } = res.data.data;

      get().setAllData(
        experience,
        education,
        language,
        speciality,
        transformAchievements(achievement),
        quote
      );

      return true;
    } catch (error) {
      console.error('Error saving data:', error);
      set({ success: false });
      return false;
    }
  },

  setAllData: (
    workExperiences,
    educations,
    languages,
    specialties,
    achievement,
    quote
  ) => {
    set({
      workExperiences,
      educations,
      selectedUserLanguages: languages.map((item) => item.id),
      achievement,
      selectedUserSpecialties: specialties.map((item) => item.id),
      quote: quote,
    });
  },
}));
