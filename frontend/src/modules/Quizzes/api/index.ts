import api from "src/api/axios";
import { QuizShortInfoType } from "src/types/quiz";

const quizzesApi = {
  getQuizzes: async () => {
    try {
      const response = await api.get("get_quizzes_list?limit_amn=10");

      return response.data as QuizShortInfoType[];
    } catch (error) {
      throw error;
    }
  },
  getWSStatus: async () => {
    try {
      const response = await api.get("get_ws_status");

      return response.data as { status: string };
    } catch (error) {
      throw error;
    }
  },
};

export default quizzesApi;