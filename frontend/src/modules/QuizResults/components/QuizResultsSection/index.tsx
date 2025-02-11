import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { FC, memo } from "react";
import { useNavigate } from "react-router-dom";
import { StyledButton } from "src/UI/StyledButton";
import { useQuizResults } from "../../store/useQuizResults";
import { QuizResultCard } from "../QuizResultCard";
import { styles } from "./styles";
import { useCurrentQuizStore } from "src/modules/AboutQuiz/store/useCurrentQuizStore";
import { useRateQuiz } from "../../hooks/useRateQuiz";

export interface QuizResultsSectionProps {
}

export const QuizResultsSection: FC<QuizResultsSectionProps> = memo(() => {
    const navigate = useNavigate();
    const { optionsChosen, reset } = useQuizResults();
    const { quiz, resetStore, quizId } = useCurrentQuizStore();
    const { isRated, postRateQuiz } = useRateQuiz();

    const handleGoBackClick = () => {
        reset();
        resetStore();
        navigate("/quizzes");
    };

    const handleRateQuiz = (rating: number) => {
      void postRateQuiz(quizId, rating);
    };

  return (
    <Box sx={styles.root}>
        <Typography variant="h1">Quiz Results</Typography>
        <Typography variant="body1">You have completed the quiz!</Typography>

        {quiz.questions.map((question, index) => (
            <QuizResultCard key={index} question={question} questionId={index + 1} selectedOption={optionsChosen[index]} />
        ))}

        <Typography variant="h3">Rate quiz:</Typography>

        <Box>
            {isRated ? (
              <Typography variant="body1">Thank you for rating the quiz!</Typography>
            ): (
              <Box sx={styles.rateButtons}>
                {Array.from({ length: 5 }, (_, index) => (
                  <StyledButton key={index} title={`${index + 1}`} onClick={() => handleRateQuiz(index + 1)} />
                ))}
              </Box>
            )}
        </Box>

        <StyledButton title="Go back to quizzes" onClick={handleGoBackClick} />
    </Box>
  );
});