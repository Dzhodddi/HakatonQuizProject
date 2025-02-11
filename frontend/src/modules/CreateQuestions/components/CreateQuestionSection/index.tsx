import { Box, Typography } from '@mui/material';
import { FC, memo, useState } from 'react';

import { StyledButton } from 'src/UI/StyledButton';
import { CustomBox } from 'src/UI/CustomBox';
import { styles } from './styles';
import { AddQuestionCard } from '../AddQuestionCard';
import { QuestionType } from 'src/types/quiz';
import { useNewQuiz } from 'src/modules/CreateQuizzes/store/useNewQuiz';
import { useNavigate } from 'react-router-dom';

export interface CreateQuestionsSectionProps {}

const defaultQuestion: QuestionType = {
    title: "Question",
    option1: "Option 1",
    option2: "",
    option3: "",
    option4: "",
    correct_option: 0,
};

export const CreateQuestionsSection: FC<CreateQuestionsSectionProps> = memo(() => {
  const [questions, setQuestions] = useState<QuestionType[]>([defaultQuestion]);
  const { quiz, setNewQuiz } = useNewQuiz();
  const navigate = useNavigate();

  const onTitleChange = (title: string, index: number) => {
    const newQuestions = [...questions];
    newQuestions[index].title = title;
    setQuestions(newQuestions);
  };

  const onOptionsChange = (options: string[], index: number) => {
    const newQuestions = [...questions];
    newQuestions[index].option1 = options[0];
    newQuestions[index].option2 = options[1];
    newQuestions[index].option3 = options[2];
    newQuestions[index].option4 = options[3];
    setQuestions(newQuestions);
  };

  const setCurrentCorrectOption = (questionIndex: number, index: number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].correct_option = index;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, defaultQuestion]);
  };

  const onSubmit = () => {
    setNewQuiz({
        ...quiz,
        questions,
    });

    console.log(quiz);

    navigate("/create-quiz/success");
  };

  return (
        <CustomBox style={styles.root}>
            <Box sx={styles.header}>
                <Typography variant="h1">Add Question</Typography>

                <StyledButton title="New" onClick={addQuestion} />
            </Box>

            {questions.map((question, index) => (
                <AddQuestionCard
                  canBeDeleted={questions.length > 1}
                  onDelete={() => setQuestions(questions.filter((_, qIndex) => qIndex !== index))}
                  setCurrentCorrectOption={(indexItem) => setCurrentCorrectOption(index, indexItem)}
                  key={index} 
                  title={question.title} 
                  onTitleChange={(title) => onTitleChange(title, index)} 
                  options={[question.option1, question.option2, question.option3, question.option4]} 
                  onOptionsChange={(options: string[]) => onOptionsChange(options, index)} 
                  correctOption={question.correct_option}
                />
            ))}

            <StyledButton title="Submit" onClick={onSubmit} />
        </CustomBox>
  );
});