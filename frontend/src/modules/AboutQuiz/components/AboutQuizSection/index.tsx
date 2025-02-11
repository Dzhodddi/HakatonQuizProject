import { Typography } from "@mui/material";
import { FC, memo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuizzesStore } from "src/modules/Quizzes/store/useQuizzesStore";
import { CustomBox } from "src/UI/CustomBox";
import { StyledButton } from "src/UI/StyledButton";

export interface AboutQuizSectionProps {
    quizId: string;
}

export const AboutQuizSection: FC<AboutQuizSectionProps> = memo(({ quizId }) => {
    const { quizzes } = useQuizzesStore();
    const navigate = useNavigate();

    const quiz = quizzes.find((quiz) => quiz.id.toString() === quizId) ?? quizzes[0];

  return (
    <CustomBox>
        <Typography variant="h1">{quiz.title}</Typography>
        <Typography variant="body1">{quiz.description}</Typography>

        <StyledButton title="Take quiz" onClick={() => navigate(`/quizzes/${quiz.id}/1`)} />
    </CustomBox>
  );
});
