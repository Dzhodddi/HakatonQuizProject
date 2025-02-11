import { Typography } from "@mui/material";
import { FC, memo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuizzesStore } from "src/modules/Quizzes/store/useQuizzesStore";
import { CustomBox } from "src/UI/CustomBox";
import { StyledButton } from "src/UI/StyledButton";
import { useQuizQuestions } from "../../hooks/useQuizQuestions";

export interface AboutQuizSectionProps {
    quizId: string;
}

export const AboutQuizSection: FC<AboutQuizSectionProps> = memo(({ quizId }) => {
    const { quizzes } = useQuizzesStore();
    const navigate = useNavigate();
    const { fetchQuizQuestions, loading } = useQuizQuestions();

    const quiz = quizzes.find((quiz) => quiz.quiz_id.toString() === quizId) ?? quizzes[0];

    const onTakeQuizClick = async () => {
        const response = await fetchQuizQuestions(quiz.quiz_id);
        if (!response) return;
        navigate(`/quizzes/${quiz.quiz_id}/1`)
    };

  return (
    <CustomBox>
        <Typography variant="h1">{quiz.quiz_title}</Typography>
        <Typography variant="body1">{quiz.quiz_description}</Typography>
        <Typography variant="h6">Author: {quiz.quiz_author}</Typography>
        <Typography variant="h6">Ratings: {quiz.quiz_ratings}/5</Typography>

        <StyledButton title="Take quiz" onClick={onTakeQuizClick} loading={loading} />
    </CustomBox>
  );
});
