import { Box, Typography } from "@mui/material";
import { FC, memo, useState } from "react";
import { QuestionOptionTextField } from "src/components/QuestionOptionTextField";
import { useQuizzesStore } from "src/modules/Quizzes/store/useQuizzesStore";
import { CustomBox } from "src/UI/CustomBox";
import { StyledButton } from "src/UI/StyledButton";
import { styles } from "./styles";
import { useQuizResults } from "src/modules/QuizResults/store/useQuizResults";
import { useNavigate } from "react-router-dom";

export interface QuizQuestionSectionProps {
    quizId: number;
    questionId: number;
}

export const QuizQuestionSection: FC<QuizQuestionSectionProps> = memo(({ quizId, questionId }) => {
    const { quizzes } = useQuizzesStore();
    const [selectedOption, setSelectedOption] = useState(0);
    const { setQuizId, setOptionsChosen, optionsChosen } = useQuizResults();
    const navigate = useNavigate();

    const quiz = quizzes.find((quiz) => quiz.id === quizId) ?? quizzes[0];

    const question = quiz.questions[questionId - 1];

    const isLastQuestion = questionId - 1 === quiz.questions.length - 1;

    const handleNextClick = () => {
        setSelectedOption(0);
        setQuizId(quizId);
        setOptionsChosen([...optionsChosen, selectedOption]);
        if (isLastQuestion) {
            navigate(`/quizzes/results`);
        } else {
            const nextQuestionId = Number(questionId) + 1;
            navigate(`/quizzes/${quizId}/${nextQuestionId}`);
        }
    };

  return (
    <CustomBox>
        <Typography variant="h6">{`Question ${questionId}`}</Typography>
        <Typography variant="h3">{question.title}</Typography>
        
        <Box sx={styles.options}>
            <QuestionOptionTextField value={question.option1} canEdit={false} onChange={()=>{}} isSelected={selectedOption === 1} setIsSelected={() => setSelectedOption(1)} />
            <QuestionOptionTextField value={question.option2} canEdit={false} onChange={()=>{}} isSelected={selectedOption === 2} setIsSelected={() => setSelectedOption(2)}/>
            <QuestionOptionTextField value={question.option3} canEdit={false} onChange={()=>{}}  isSelected={selectedOption === 3} setIsSelected={() => setSelectedOption(3)}/>
            <QuestionOptionTextField value={question.option4} canEdit={false} onChange={()=>{}} isSelected={selectedOption === 4} setIsSelected={() => setSelectedOption(4)}/>

        </Box>

        <StyledButton title={isLastQuestion ? "Submit" : "Next"} onClick={handleNextClick} />
    </CustomBox>
  );
});