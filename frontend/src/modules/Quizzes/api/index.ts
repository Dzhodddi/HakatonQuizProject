import api from "src/api/axios";
import { QuizShortInfoType } from "src/types/quiz";

const quizzesApi = {
  getQuizzes: async () => {
    try {
      const response = await api.get("get_quizzes_list?limit_amn=50");

      return response.data as QuizShortInfoType[];
    } catch (error) {
      throw error;
    }
  },
};

export default quizzesApi;