import { useCallback, useState } from "react";
import { useApiError } from "src/hooks/useApiError";
import rateApi from "../api";
import { useUserStore } from "src/modules/Login/store/useUserStore";

export const useRateQuiz = () => {
    const { apiError, handleError } = useApiError();
    const [isRated, setIsQuizRated] = useState<boolean>(false);
    const { user } = useUserStore();

  const postRateQuiz = useCallback(async (quizId: number, rating: number) => {
    try {
        console.log(user.id);
        console.log(quizId);
        console.log(rating);
      await rateApi.postRateQuiz(Number(user.id), quizId, rating);
        setIsQuizRated(true);
    } catch (error) {
      handleError(error);
    } 
  }, []);

  return { apiError, isRated, postRateQuiz };
};