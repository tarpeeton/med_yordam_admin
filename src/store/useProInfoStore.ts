import axios from 'axios'


export type Language = "ru" | "uz" | "en";

interface MultilingualText {
  ru: string;
  uz: string;
  en: string;
}

interface Specialty {
  id: number;
  name: MultilingualText;
  selected: boolean;
}

interface LanguageSkill {
  id: number;
  name: MultilingualText;
  selected: boolean;
}

interface Achievement {
  id: number;
  name: MultilingualText;
}

interface Education {
  id: number;
  name: MultilingualText;
  direction: MultilingualText;
  startYear: string;
  endYear: string;
}

interface WorkExperience {
  id: number;
  name: MultilingualText;
  city: MultilingualText;
  fromYear: string;
  toYear: string;
  positions: MultilingualText[];
}

interface ProInfoState {
  specialties: Specialty[];
  languages: LanguageSkill[];
  achievements: Achievement[];
  educations: Education[];
  workExperiences: WorkExperience[];

  // Specialty methods
  toggleSpecialty: (id: number) => void;

  // Language methods
  toggleLanguage: (id: number) => void;

  // Achievement methods
  addAchievement: () => void;
  updateAchievementField: (id: number, lang: Language, value: string) => void;
  removeAchievement: (id: number) => void;

  // Education methods
  addEducation: () => void;
  updateEducationField: (
    id: number,
    field: "name" | "direction" | "startYear" | "endYear",
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
  addPositionToWorkExperience: (id: number) => void;
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
}

// Zustand store
import { create } from "zustand";

export const useProInfoStore = create<ProInfoState>((set, get) => ({
  specialties: [
    {
      id: 1,
      name: { ru: "Программирование", uz: "Dasturlash", en: "Programming" },
      selected: false,
    },
    {
      id: 2,
      name: { ru: "Дизайн", uz: "Dizayn", en: "Design" },
      selected: false,
    },
  ],
  languages: [
    {
      id: 1,
      name: { ru: "Русский", uz: "Ruscha", en: "Russian" },
      selected: false,
    },
    {
      id: 2,
      name: { ru: "Английский", uz: "Inglizcha", en: "English" },
      level: { ru: "Высокий", uz: "Yuqori", en: "Advanced" },
      selected: false,
    },
    {
      id: 3,
      name: { ru: "Узбекиский", uz: "O'zbekcha", en: "Uzbek" },
      level: { ru: "Высокий", uz: "Yuqori", en: "Advanced" },
      selected: false,
    },
  ],
  achievements: [
    { id: 1, name: { ru: "Сертификат AWS", uz: "AWS Sertifikat", en: "AWS Certificate" } },
  ],
  educations: [
    {
      id: 1,
      name: { ru: "Университет", uz: "Universitet", en: "University" },
      direction: { ru: "Информатика", uz: "Informatika", en: "Computer Science" },
      startYear: "2015",
      endYear: "2019",
    },
  ],
  workExperiences: [
    {
      id: 1,
      name: { ru: "Компания X", uz: "Kompaniya X", en: "Company X" },
      city: { ru: "Москва", uz: "Moskva", en: "Moscow" },
      fromYear: "2020",
      toYear: "2023",
      positions: [
        { ru: "Разработчик", uz: "Dasturchi", en: "Developer" },
        { ru: "Менеджер", uz: "Menejer", en: "Manager" },
      ],
    },
  ],

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
        { id: state.achievements.length + 1, name: { ru: "", uz: "", en: "" } },
      ],
    }));
  },

  updateAchievementField: (id, lang, value) => {
    set((state) => ({
      achievements: state.achievements.map((achievement) =>
        achievement.id === id
          ? { ...achievement, name: { ...achievement.name, [lang]: value } }
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
          id: state.educations.length + 1,
          name: { ru: "", uz: "", en: "" },
          direction: { ru: "", uz: "", en: "" },
          startYear: "",
          endYear: "",
        },
      ],
    }));
  },

  updateEducationField: (id, field, lang, value) => {
    set((state) => ({
      educations: state.educations.map((education) =>
        education.id === id
          ? {
              ...education,
              [field]: lang
                ? { ...(education[field] as MultilingualText), [lang]: value }
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
          id: state.workExperiences.length + 1,
          name: { ru: "", uz: "", en: "" },
          city: { ru: "", uz: "", en: "" },
          fromYear: "",
          toYear: "",
          positions: [],
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
                ? { ...(experience[field] as MultilingualText), [lang]: value }
                : value,
            }
          : experience
      ),
    }));
  },

  addPositionToWorkExperience: (id) => {
    set((state) => ({
      workExperiences: state.workExperiences.map((experience) =>
        experience.id === id
          ? {
              ...experience,
              positions: [...experience.positions, { ru: "", uz: "", en: "" }],
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
            positions: experience.positions.map((position, index) =>
              index === positionIndex
                ? { ...position, [lang]: value }
                : position
            ),
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
              positions: experience.positions.filter((_, index) => index !== positionIndex),
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

  save: async () => {
    const state = get();
    console.log(state , 'BU STATE')
    try {
      const response = await axios.post("/api/pro-info", {
        specialties: state.specialties,
        languages: state.languages,
        achievements: state.achievements,
        educations: state.educations,
        workExperiences: state.workExperiences,
      });
      console.log("Data saved successfully:", response.data);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  },
}));
