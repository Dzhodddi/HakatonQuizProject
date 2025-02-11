import { QuizType } from 'src/types/quiz';
import { create } from 'zustand'

interface QuizzesState {
  quizzes: QuizType[];
    setQuizzes: (quizzes: QuizType[]) => void;
}

export const useQuizzesStore = create<QuizzesState>()((set) => ({
    quizzes: [],
    setQuizzes: (quizzes) => set({ quizzes }),
}));