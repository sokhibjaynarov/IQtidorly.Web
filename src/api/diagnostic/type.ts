export interface DiagnosticPost {
  quiz: string;
  language: string;
}

type Submission = {
  question: string;
  answer: string;
  order: number;
};
export interface DiagnosticSumbit {
  quiz: string;
  submissions: Submission[];
}
