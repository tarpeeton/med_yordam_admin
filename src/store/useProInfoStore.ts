import axios from 'axios'
import { multiLang } from '@/interface/multiLang';
// Zustand store
import { create } from "zustand";
import { useProfileStore } from '@/store/profileStore';

export type Language = "ru" | "uz" | "en";


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

interface Achievement {
  id: number | null;
  name: {
    ru: string[];  // Russian language array
    uz: string[];  // Uzbek language array
    en: string[];  // English language array
  }
  
}

interface Education {
  id: number | null;
  name: multiLang;
  faculty: multiLang;
  fromYear: string;
  toYear: string;
  direction?: string
}


const normalizeAchievements = (rawAchievements: Achievement[] | undefined): Achievement[] => {
  if (!Array.isArray(rawAchievements)) {
    console.error("rawAchievements is not an array:", rawAchievements);
    return [];
  }
  return rawAchievements.map((achievement) => ({
    id: achievement.id,
    name: {
      ru: achievement.name.ru.filter((item) => item.trim() !== ""),
      uz: achievement.name.uz.filter((item) => item.trim() !== ""),
      en: achievement.name.en.filter((item) => item.trim() !== ""),
    },
  }));
};






interface WorkExperience {
  id: number | null;
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
  achievements: Achievement[];
  educations: Education[];
  workExperiences: WorkExperience[];
  success: boolean;
  // Specialty methods
  toggleSpecialty: (id: number) => void;

  // Language methods
  toggleLanguage: (id: number) => void;

  // Achievement methods
  addAchievement: () => void;
  updateAchievementField: (id: number | null, lang: Language, value: string) => void;
  removeAchievement: (id: number) => void;

  // Education methods
  addEducation: () => void;
  setSuccess: (success: boolean) => void;
  updateEducationField: (
    id: number | null,
    field: "name" | "faculty" | "fromYear" | "toYear",
    lang: Language | null,
    value: string
  ) => void;
  removeEducation: (id: number) => void;

  // Work experience methods
  addWorkExperience: () => void;
  updateWorkExperienceField: (
    id: number,
    field: "name" | "city" | "fromYear" | "toYear",
    lang: Language | null,
    value: string
  ) => void;
  addPositionToWorkExperience: (id: number, lng: Language) => void;
  updatePositionInWorkExperience: (
    id: number,
    positionIndex: number,
    lang: Language,
    value: string
  ) => void;
  removePositionFromWorkExperience: (id: number, positionIndex: number) => void;
  removeWorkExperience: (id: number) => void;
  // Save method
  save: () => void;
  fetchSpecialties: () => Promise<void>;
  fetchLanguage: () => Promise<void>;
  setAllData: (workExperiences: WorkExperience[], educations: Education[], languages: LanguageSkill[], specialties: Specialty[] , achievements: Achievement[]) => void
}




export const useProInfoStore = create<ProInfoState>((set, get) => ({
  success: false,
  specialties: [],
  languages: [],
  achievements: [
    { id: 1, name: {ru: ["a"] , uz: ["a"] , en: ["a"]} },
  ],
  educations: [
    {
      id: null,
      name: { ru: "Университет", uz: "Universitet", en: "University" },
      faculty: { ru: "Информатика", uz: "Informatika", en: "Computer Science" },
      fromYear: "2015",
      toYear: "2019",
    },
  ],
  workExperiences: [
    {
      id: null,
      name: { ru: "Компания X", uz: "Kompaniya X", en: "Company X" },
      city: { ru: "Москва", uz: "Moskva", en: "Moscow" },
      fromYear: "2020",
      toYear: "2023",
      position: {
        ru: ["Разработчик"],
        uz: ["Dasturchi"],
        en: ["Developer"],
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

  toggleLanguage: (id) => {
    set((state) => ({
      languages: state.languages.map((language) =>
        language.id === id
          ? { ...language, selected: !language.selected }
          : language
      ),
    }));
  },
  addAchievement: () => {
    set((state) => ({
      achievements: [
        ...state.achievements,
        { id: state.achievements.length + 1, name: { ru: [""], uz: [""] ,  en: [""] } },
      ],
    }));
  },

updateAchievementField: (id: number | null, lang: Language, value: string) => {
  set((state) => ({
    achievements: state.achievements.map((achievement) =>
      achievement.id === id
        ? {
            ...achievement,
            name: {
              ...achievement.name,
              [lang]: [value], // Ensure `value` is wrapped in an array
            },
          }
        : achievement
    ),
  }));
},


  removeAchievement: (id) => {
    set((state) => ({
      achievements: state.achievements.filter((achievement) => achievement.id !== id),
    }));
  },
  addEducation: () => {
    set((state) => ({
      educations: [
        ...state.educations,
        {
          id: null,
          name: { ru: "", uz: "", en: "" },
          faculty: { ru: "", uz: "", en: "" },
          fromYear: "",
          toYear: "",
        },
      ],
    }));
  },



  updateEducationField: (
    id: number | null,
    field: "name" | "faculty" | "fromYear" | "toYear",
    lang: Language | null,
    value: string
  ) => {
    set((state) => ({
      educations: state.educations.map((education) =>
        education.id === id
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
          name: { ru: "", uz: "", en: "" },
          city: { ru: "", uz: "", en: "" },
          fromYear: "",
          toYear: "",
          position: {
            ru: [""],
            uz: [""],
            en: [""],
          },
        },
      ],
    }));
  },

  updateWorkExperienceField: (id, field, lang, value) => {
    set((state) => ({
      workExperiences: state.workExperiences.map((experience) =>
        experience.id === id
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

  addPositionToWorkExperience: (id , lng) => {
    set((state) => ({
      workExperiences: state.workExperiences.map((experience) =>
        experience.id === id
          ? {
              ...experience,
              position: {
                ...experience.position,
                ru: [...experience.position.ru, ""],
                uz: [...experience.position.uz, ""],
                en: [...experience.position.en, ""],
              },
            }
          : experience
      ),
    }));
  },

  updatePositionInWorkExperience: (id, positionIndex, lang, value) => {
    set((state) => ({
        workExperiences: state.workExperiences.map((experience) => {
            console.log(experience, "JALAPMISAN AMBAShA");
            if (experience.id === id) {
                return {
                    ...experience,
                    position: {
                        ...experience.position,
                        [lang]: experience.position[lang].map((position, index) =>
                            index === positionIndex
                                ? value // Bu yerda faqat string qiymatini saqlaymiz
                                : position
                        ),
                    },
                };
            }
            return experience;
        }),
    }));
},

  removePositionFromWorkExperience: (id, positionIndex) => {
    set((state) => ({
      workExperiences: state.workExperiences.map((experience) =>
        experience.id === id
          ? {
              ...experience,
              position: { 
                ...experience.position,
                ru: experience.position.ru.filter((_, index) => index !== positionIndex),
              },
            }
          : experience
      ),
    }));
  },

  removeWorkExperience: (id) => {
    set((state) => ({
      workExperiences: state.workExperiences.filter((experience) => experience.id !== id),
    }));
  },
  fetchSpecialties: async () => {
    try {
      const response = await axios.get("https://medyordam.result-me.uz/api/speciality" , {headers: {'Accept-Language': ""}});
      set({ specialties: response.data.data });
    } catch (error) {
      console.error("Error fetching specialties:", error);
    }
  },
  fetchLanguage: async () => {
    try {
      const response = await axios.get("https://medyordam.result-me.uz/api/language" );
      set({ languages: response.data.data });
    } catch (error) {
      console.error("Error fetching specialties:", error);
    }
  },

  


  save: async () => {
    const state = get();
    const { id } = useProfileStore.getState();
  
    try {
      // =========
      // Achievements
      // =========
      // const achievementsArray = state.achievements;
      const achievementsTransformed = normalizeAchievements(state.achievements);
  
      // =========
      // Education
      // =========
      const educationArray = state.educations;
      const educationTransformed = educationArray.map((item) => ({
        id: item.id ?? null, 
        name: {
          ru: item.name.ru,
          uz: item.name.uz,
          en: item.name.en,
        },
        fromYear: Number(item.fromYear),
        toYear: Number(item.toYear),
        faculty: {
          ru: item.faculty.ru,
          uz: item.faculty.uz,
          en: item.faculty.en,
        },
      }));
  
      // =========
      // Work Experience
      // =========
      const experiencesArray = state.workExperiences;
  
      // Превращаем локальные записи в формат, который ожидает сервер.
      // Если у вас "новые" записи без id, можно передавать id=null (или совсем не передавать),
      // чтобы бэкенд понимал: нужно создать новую запись и сгенерировать для неё id.
      const experiencesTransformed = experiencesArray.map((exp) => ({
        id: exp.id ?? null, 
        name: {
          ru: exp.name.ru,
          uz: exp.name.uz,
          en: exp.name.en,
        },
        fromYear: Number(exp.fromYear),
        toYear: Number(exp.toYear),
        city: {
          ru: exp.city.ru,
          uz: exp.city.uz,
          en: exp.city.en,
        },
        position: {
          ru: exp.position.ru.map((p) => p),
          uz: exp.position.uz.map((p) => p),
          en: exp.position.en.map((p) => p),
        },
      }));
  
      // =========
      // Specialities
      // =========
      const specialitiesSelected = state.specialties
        .filter((specialty) => specialty.selected)
        .map((specialty) => specialty.id);
  
      const languagesForUpdate = state.languages
        .filter((language) => language.selected)
        .map((language) => language.id);
  
      // =========
      // Отправка на сервер
      // =========
      const response = await axios.put("https://medyordam.result-me.uz/api/doctor", {
        id,
        achievement: achievementsTransformed,
        education: educationTransformed,
        speciality: specialitiesSelected,
        language: languagesForUpdate,
        experience: experiencesTransformed,
      });
  
     
      if (response.data.data.experience) {
        const updatedExperiencesFromServer = response.data.data.experience;
       
        const updatedExperiences = updatedExperiencesFromServer.map((srv: { id: number; name: multiLang; city: multiLang; fromYear: string; toYear: string; position: { ru: string[]; uz: string[]; en: string[]; }; }) => {
          return {
            id: srv.id,
            name: srv.name, // при необходимости адаптируйте под multiLang
            city: srv.city, // аналогично
            fromYear: srv.fromYear?.toString() ?? "", 
            toYear: srv.toYear?.toString() ?? "",
            position: Array.isArray(srv.position?.ru)
              ? srv.position.ru.map((_:string, idx:number) => ({
                  ru: srv.position.ru[idx] || "",
                  uz: srv.position.uz[idx] || "",
                  en: srv.position.en[idx] || "",
                }))
              : [],
          };
        });
  
        set((prevState) => ({
          ...prevState,
          workExperiences: updatedExperiences,
        }));
      }
      if(response.data.data.education){
        const updatedEducationFromServer = response.data.data.education;
        console.log(updatedEducationFromServer , 'EDUCATION')
        const updatedEducation = updatedEducationFromServer.map((srv: { id: number; name: multiLang; fromYear: string; toYear: string; faculty: multiLang; }) => {
          return {
            id: srv.id,
            name: srv.name, // при необходимости адаптируйте под multiLang
            startYear: srv.fromYear?.toString() ?? "",
            endYear: srv.toYear?.toString() ?? "",
            direction: srv.faculty, // аналогично
          };
        });
        set((prevState) => ({
          ...prevState,
          educations: updatedEducation,
        }));
      }
      set({ success: true });
    } catch (error) {
      console.error("Error saving data:", error);
      set({ success: false });
    }
  },



  


  setAllData: (
    workExperiences: WorkExperience[],
    educations: Education[],
    languages: LanguageSkill[],
    specialties: Specialty[],
    achievements: Achievement[]
  ) => {
    const normalizedAchievements = normalizeAchievements(achievements);
  
    set({
      workExperiences,
      educations,
      languages,
      specialties,
      achievements: normalizedAchievements,
    });
  },
  
  
  

 
   
  
}))
