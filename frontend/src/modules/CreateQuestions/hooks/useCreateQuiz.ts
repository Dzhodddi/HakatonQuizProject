import { useCallback, useState } from "react";
import { useApiError } from "src/hooks/useApiError";
import { QuizType } from "src/types/quiz";
import createQuizApi from "../api";
import { componentToApiQuiz } from "src/helpers/adaptQuizData";

export const useCreateQuiz = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { apiError, handleError } = useApiError();

  const postCreateQuiz = useCallback(async (quiz: QuizType) => {
    setLoading(true);
    console.log(componentToApiQuiz(quiz));

    try {
        const response = await createQuizApi.postCreateQuiz(componentToApiQuiz(quiz));

        console.log(response);

      return true;
    } catch (error) {
      handleError(error);

        return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, apiError, postCreateQuiz };
};