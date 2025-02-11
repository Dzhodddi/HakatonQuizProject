import { create } from 'zustand'

interface QuizResultsState {
    quizId: number;
    optionsChosen: number[];
    setQuizId: (quizId: number) => void;
    setOptionsChosen: (optionsChosen: number[]) => void;
    reset: () => void;
}

export const useQuizResults = create<QuizResultsState>()((set) => ({
    quizId: 0,
    optionsChosen: [],
    setQuizId: (quizId) => set({ quizId }),
    setOptionsChosen: (optionsChosen) => set({ optionsChosen }),
    reset: () => set({ quizId: 0, optionsChosen: []}),
}));