import api from "src/api/axios";

const rateApi = {
  postRateQuiz: async (userId: number, quizId: number, rating: number) => {
    try {
      const response = await api.post("rate_quiz", {
        guest_id: userId,
        quiz_id: quizId,
        rating,
      });

      return response.data as { success: boolean };
    } catch (error) {
      throw error;
    }
  },
};

export default rateApi;