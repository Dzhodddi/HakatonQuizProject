import api from "src/api/axios";
import { QuizApiType } from "src/types/quiz";

const quizQuestionsApi = {
  getQuizQuestions: async (quizId: number) => {
    try {
      const response = await api.get(`quiz_json/${quizId}`);

      return response.data as QuizApiType;
    } catch (error) {
      throw error;
    }
  },
};

export default quizQuestionsApi;