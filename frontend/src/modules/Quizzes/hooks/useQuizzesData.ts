import { useCallback, useState } from "react";
import { useQuizzesStore } from "../store/useQuizzesStore";
import { useApiError } from "src/hooks/useApiError";
import quizzesApi from "../api";

export const useQuizzesData = () => {
  const { quizzes, setQuizzes } = useQuizzesStore();
  const { apiError, handleError } = useApiError();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchQuizzes = useCallback(async () => {
    setLoading(true);
    try {
      const response = await quizzesApi.getQuizzes();

      setQuizzes(response);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { quizzes, fetchQuizzes, apiError, loading };
};