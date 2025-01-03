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

export interface Achievement {
    ru: string[];  
    uz: string[]; 
    en: string[];  
}

interface Education {
  id: number | null;
  name: multiLang;
  faculty: multiLang;
  fromYear: string;
  toYear: string;
  direction?: string
}





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
    id: number | null,
    field: "name" | "faculty" | "fromYear" | "toYear",
    lang: Language | null,
    value: string
  ) => void;
  removeEducation: (id: number) => void;
  updateAchievementField: (index: number, lang: Language, value: string) => void;
  // Work experience methods
  addWorkExperience: () => void;
  updateWorkExperienceFieldByIndex: (
    index: number,
    field: keyof WorkExperience,
    lang: Language | null,
    value: string | number
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
  setAllData: (workExperiences: WorkExperience[], educations: Education[], languages: LanguageSkill[], specialties: Specialty[], achievements: Achievement[]) => void
}




export const useProInfoStore = create<ProInfoState>((set, get) => ({
  success: false,
  specialties: [],
  languages: [],
  selectedUserSpecialties: [],
  selectedUserLanguages: [],
  specialtiesFinished: false,
  achievements: [
    { ru:[""] , uz: [""] , en: [""] },
  ],
  educations: [
    {
      id: 1,
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
      achievements: [
        ...state.achievements,
        { ru:[""] , uz: [""] , en: [""] },
      ],
    }));
  },


  updateAchievementField: (index: number, lang: Language, value: string) => {
    set((state) => ({
      achievements: state.achievements.map((achievement, i) =>
        i === index
          ? {
              ...achievement,
              [lang]: achievement[lang].map((_, idx) => (idx === 0 ? value : _)),
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

  updateWorkExperienceFieldByIndex: (index: number, field: keyof WorkExperience, lang: Language | null, value: string | number) => {
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
      const response = await axios.get("https://medyordam.result-me.uz/api/speciality", {
        headers: { 'Accept-Language': "" },
      });
  
      const currentSelectedIds = get().selectedUserSpecialties;
  
      const specialties = response.data.data.map((specialty: { id: number; name: multiLang; active: boolean }) => ({
        ...specialty,
        selected: currentSelectedIds.includes(specialty.id), // Check if the specialty ID is in the selected list
      }));
  
      set({ specialties });
    } catch (error) {
      console.error("Error fetching specialties:", error);
    }
  },
  

  fetchLanguage: async () => {
    try {
      const response = await axios.get("https://medyordam.result-me.uz/api/language" );
      const currentSelectedIds = get().selectedUserLanguages;

      const languages = response.data.data.map((language: { id: number; name: multiLang; active: boolean }) => ({
        ...language,
        selected: currentSelectedIds.includes(language.id), // Check if the specialty ID is in the selected list
      }));
      set({ languages });
    } catch (error) {
      console.error("Error fetching specialties:", error);
    }
  },

  





  save: async () => {
    const state = get();
    const { id } = useProfileStore.getState();
    const token = localStorage.getItem("token");
    try {
      // =========
      // Achievements Transformation
      // =========
      const achievementsTransformed = {
        uz: state.achievements.map((achievement) => achievement.uz[0]).filter(Boolean),
        ru: state.achievements.map((achievement) => achievement.ru[0]).filter(Boolean),
        en: state.achievements.map((achievement) => achievement.en[0]).filter(Boolean),
      };
  
      // =========
      // Education Transformation
      // =========
      const educationTransformed = state.educations.map((education) => ({
        id: education.id ?? null,
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
      }));
  
      // =========
      // Work Experience Transformation
      // =========
      const experienceTransformed = state.workExperiences.map((experience) => ({
        id: experience.id ?? null,
        name: {
          ru: experience.name.ru,
          uz: experience.name.uz,
          en: experience.name.en,
        },
        city: {
          ru: experience.city.ru,
          uz: experience.city.uz,
          en: experience.city.en,
        },
        position: {
          ru: experience.position.ru.filter(Boolean),
          uz: experience.position.uz.filter(Boolean),
          en: experience.position.en.filter(Boolean),
        },
        fromYear: Number(experience.fromYear),
        toYear: Number(experience.toYear),
      }));
  
      // =========
      // Specialities and Languages
      // =========
      const specialitiesSelected = state.specialties
        .filter((specialty) => specialty.selected)
        .map((specialty) => specialty.id);
  
      const languagesSelected = state.languages
        .filter((language) => language.selected)
        .map((language) => language.id);
  
      // =========
      // Payload Formation
      // =========
      const payload = {
        id,
        achievement: achievementsTransformed,
        education: educationTransformed,
        speciality: specialitiesSelected,
        language: languagesSelected,
        experience: experienceTransformed,
      };
  
      // =========
      // API Call
      // =========
      const response = await axios.put(
        "https://medyordam.result-me.uz/api/doctor",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`, 
            "Content-Type": "application/json", 
          },
        }
      );
      
  
      if (response.status === 200) {
        set({ success: true });
      } else {
        console.error("Error saving data:", response.data);
        set({ success: false });
      }
    } catch (error) {
      console.error("Error saving data:", error);
      set({ success: false });
    }
  },
  



  

  setAllData: (workExperiences, educations, languages, specialties, achievements) => {
   
  
    set({
      workExperiences,
      educations,
      selectedUserLanguages: languages.map((item) => item.id),
      achievements,
      selectedUserSpecialties: specialties.map((item) => item.id),
    });
  },
  

  

 
   
  
}))
