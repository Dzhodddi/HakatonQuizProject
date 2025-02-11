import { QuizShortInfoType } from 'src/types/quiz';
import { create } from 'zustand'

interface QuizzesState {
  quizzes: QuizShortInfoType[];
    setQuizzes: (quizzes: QuizShortInfoType[]) => void;
}

export const useQuizzesStore = create<QuizzesState>()((set) => ({
    quizzes: [],
    setQuizzes: (quizzes) => set({ quizzes }),
}));