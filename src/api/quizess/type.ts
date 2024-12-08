import type { GridRowSelectionModel } from '@mui/x-data-grid';

export interface QuizessLanguage {
  title: string;
  description: string;
  image: string;
}
export interface Quizess {
  _id?: string;
  ru?: QuizessLanguage;
  en?: QuizessLanguage;
  uz?: QuizessLanguage;
  qr?: QuizessLanguage;
  subject: string;
  age_group: string | any;
  questions: GridRowSelectionModel;
  duration?: number;
  start_time: string | number;
  end_time: string | number;
  type: string;
  registration: {
    start_time: string | number;
    end_time: string | number;
  };
  is_public: boolean;
}
