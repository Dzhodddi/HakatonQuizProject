import { QuizType } from 'src/types/quiz';
import { create } from 'zustand'

interface NewQuizState {
  quiz: QuizType;
  setNewQuiz: (quiz: QuizType) => void
}

export const useNewQuiz = create<NewQuizState>()((set) => ({
    quiz: {
        id: 0,
        title: "",
        description: "",
        questions: [],
        author: {
            id: "0",
            first_name: "",
            second_name: "",
            email: "",
        },
    },
    setNewQuiz: (quiz) => set({ quiz }),
}))
