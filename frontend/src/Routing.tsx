import { LoginPage } from "src/pages/LoginPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { SignUpPage } from "./pages/SignUpPage";
import { QuizzesPage } from "./pages/QuizzesPage";
import { CreateQuizPage } from "./pages/CreateQuizPage";
import { CreateQuestionsPage } from "./pages/CreateQuestionPage";
import { CreateQuizSuccessPage } from "./pages/CreateQuizSuccessPage";
import { AboutQuizPage } from "./pages/AboutQuizPage";
import { QuizQuestionPage } from "./pages/QuizQuestionPage";
import { QuizResultsPage } from "./pages/QuizResultsPage";

const Routing = () => {
  return (
    <Routes>
    <Route path="/" element={<Navigate to={`/Login`} replace />} />
    <Route
      path={`/login`}
      element={<LoginPage />}
    />
    <Route
      path={`/signup`}
      element={<SignUpPage />}
    />
    <Route
        path={`/quizzes`}
        element={<QuizzesPage />}
      />
      <Route
        path={`/create-quiz`}
        element={<CreateQuizPage />}
      />
      <Route
        path={`/create-quiz/questions`}
        element={<CreateQuestionsPage />}
      />
      <Route
        path={`/create-quiz/success`}
        element={<CreateQuizSuccessPage />}
      />
      <Route path="/quizzes/:quizId" element={<AboutQuizPage />} />

      <Route path="/quizzes/:quizId/:questionId" element={<QuizQuestionPage />} />

      <Route
        path={`/quizzes/results`}
        element={<QuizResultsPage />}
      />
  </Routes>
  );
};

export default Routing;