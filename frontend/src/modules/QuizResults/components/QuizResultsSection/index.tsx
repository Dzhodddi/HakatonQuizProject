import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { FC, memo } from "react";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "src/UI/StyledButton";
import { useQuizResults } from "../../store/useQuizResults";
import { useQuizzesStore } from "src/modules/Quizzes/store/useQuizzesStore";
import { QuizResultCard } from "../QuizResultCard";
import { styles } from "./styles";

export interface QuizResultsSectionProps {
}

export const QuizResultsSection: FC<QuizResultsSectionProps> = memo(() => {
    const navigate = useNavigate();
    const { quizId, optionsChosen, reset } = useQuizResults();
    const { quizzes } = useQuizzesStore();

    const quiz = quizzes.find((quiz) => quiz.id === quizId) ?? quizzes[0];

    const handleGoBackClick = () => {
        reset();
        navigate("/quizzes");
    };

  return (
    <Box sx={styles.root}>
        <Typography variant="h1">Quiz Results</Typography>
        <Typography variant="body1">You have completed the quiz!</Typography>

        {quiz.questions.map((question, index) => (
            <QuizResultCard key={index} question={question} questionId={index + 1} selectedOption={optionsChosen[index]} />
        ))}

        <StyledButton title="Go back to quizzes" onClick={handleGoBackClick} />
    </Box>
  );
});