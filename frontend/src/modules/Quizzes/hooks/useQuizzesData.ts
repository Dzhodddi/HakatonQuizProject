import dummyQuizzes from "../constants";
import { useQuizzesStore } from "../store/useQuizzesStore";

export const useQuizzesData = () => {
  const { quizzes, setQuizzes } = useQuizzesStore();

  const fetchQuizzes = () => {
    setQuizzes(dummyQuizzes);
  };

  return { quizzes, fetchQuizzes };
};