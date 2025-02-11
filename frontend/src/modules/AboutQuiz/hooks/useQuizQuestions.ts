import { useCallback, useState } from "react";
import { useApiError } from "src/hooks/useApiError";
import quizQuestionsApi from "../api";
import { useCurrentQuizStore } from "../store/useCurrentQuizStore";
import { apiToComponentQuiz } from "src/helpers/adaptQuizData";

export const useQuizQuestions = () => {
  const { apiError, handleError } = useApiError();
  const [loading, setLoading] = useState<boolean>(false);
  const { setQuiz, setQuizId } = useCurrentQuizStore();

  const fetchQuizQuestions = useCallback(async (quizId: number) => {
    setLoading(true);
    try {
      const response = await quizQuestionsApi.getQuizQuestions(quizId);

      setQuiz(apiToComponentQuiz(response));

      setQuizId(quizId);

      return true;
    } catch (error) {
      handleError(error);

      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchQuizQuestions, apiError, loading };
};