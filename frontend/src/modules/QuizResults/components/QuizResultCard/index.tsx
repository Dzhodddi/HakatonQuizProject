import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { FC, memo } from "react";
import { QuestionOptionTextField } from "src/components/QuestionOptionTextField";
import { QuestionType } from "src/types/quiz";
import { CustomBox } from "src/UI/CustomBox";
import { styles } from "./styles";

export interface QuizResultCardProps {
    question: QuestionType;
    questionId: number;
    selectedOption: number;
}

export const QuizResultCard: FC<QuizResultCardProps> = memo(({ selectedOption, question, questionId}) => {
    const isWrong = (option: number) => option !== question.correct_option && option === selectedOption;
  return (
    <CustomBox style={styles.root}>
    <Typography variant="h6">{`Question ${questionId}`}</Typography>
    <Typography variant="h3">{question.title}</Typography>
    
    <Box sx={styles.options}>
        <QuestionOptionTextField value={question.option1} canEdit={false} onChange={()=>{}} isSelected={selectedOption === 1} isCorrect={question.correct_option === 1} isWrong={isWrong(1)}/>
        {question.option2 !== "" && (
          <QuestionOptionTextField value={question.option2} canEdit={false} onChange={()=>{}} isSelected={selectedOption === 2} isCorrect={question.correct_option === 2} isWrong={isWrong(2)}/>
        )}
        {question.option3 !== "" && (
          <QuestionOptionTextField value={question.option3} canEdit={false} onChange={()=>{}} isSelected={selectedOption === 3} isCorrect={question.correct_option === 3} isWrong={isWrong(3)}/>
        )}
        {question.option4 !== "" && (
          <QuestionOptionTextField value={question.option4} canEdit={false} onChange={()=>{}} isSelected={selectedOption === 4} isCorrect={question.correct_option === 4} isWrong={isWrong(4)}/>
        )}
    </Box>
    </CustomBox>
  );
});