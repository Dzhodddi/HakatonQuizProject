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
import { ProfilePage } from "./pages/ProfilePage";
import LazyLoadPage from "./pages/LazyLoadPage";

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
        element={<LazyLoadPage><QuizzesPage /></LazyLoadPage>}
      />
      <Route
        path={`/create-quiz`}
        element={<LazyLoadPage><CreateQuizPage /></LazyLoadPage>}
      />
      <Route
        path={`/create-quiz/questions`}
        element={<LazyLoadPage><CreateQuestionsPage /></LazyLoadPage>}
      />
      <Route
        path={`/create-quiz/success`}
        element={<LazyLoadPage><CreateQuizSuccessPage /></LazyLoadPage>}
      />
      <Route path="/quizzes/:quizId" element={<LazyLoadPage><AboutQuizPage /></LazyLoadPage>} />

      <Route path="/quizzes/:quizId/:questionId" element={<LazyLoadPage><QuizQuestionPage /></LazyLoadPage>} />

      <Route
        path={`/quizzes/results`}
        element={<LazyLoadPage><QuizResultsPage /></LazyLoadPage>}
      />

      <Route
        path={`/profile`}
        element={<LazyLoadPage><ProfilePage /></LazyLoadPage>}
      />
  </Routes>
  );
};

export default Routing;