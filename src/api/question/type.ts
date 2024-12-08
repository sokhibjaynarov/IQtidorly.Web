export interface Answers {
  text: string | undefined;
  media?: string;
  is_correct: boolean;
}
export interface LanguageQuestion {
  content: string;
  media?: string | File | null;
  answers: Answers[];
  correct_answer: Answers;
}

export interface QuestionCard {
  subject: string;
  chapter?: string;
  type: string;
  difficulty: number;
  age_group: string;
  ru?: LanguageQuestion;
  uz?: LanguageQuestion;
  en?: LanguageQuestion;
  qr?: LanguageQuestion;
}
