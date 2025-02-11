import api from "src/api/axios";
import { QuizApiType } from "src/types/quiz";

const createQuizApi = {
  postCreateQuiz: async (quiz: QuizApiType) => {
    try {
      const response = await api.post("create_quiz", quiz);

      return response.data as { success: string };
    } catch (error) {
      throw error;
    }
  },
};

export default createQuizApi;