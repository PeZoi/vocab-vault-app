export type MultipleChoiceType = {
  id: number;
  term: string;
  answers: AnswerType[];
};

export type AnswerType = {
  id: number,
  answer: string,
}

export type ResultAnswerType = {
  questionId: number,
  answerId: number | null,
}
