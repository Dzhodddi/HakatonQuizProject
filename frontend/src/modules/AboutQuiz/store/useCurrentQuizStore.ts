import { QuizType } from 'src/types/quiz';
import { create } from 'zustand'

interface CurrentQuizState {
  quizId: number;
  setQuizId: (quizId: number) => void;
  quiz: QuizType;
  setQuiz: (quiz: QuizType) => void;
  resetStore: () => void;
}

export const useCurrentQuizStore = create<CurrentQuizState>()((set) => ({
  quiz: {} as QuizType,
  quizId: 0,
  setQuizId: (quizId) => set({ quizId }),
  setQuiz: (quiz) => set({ quiz }),
  resetStore: () => set({ quiz: {} as QuizType }),
}));