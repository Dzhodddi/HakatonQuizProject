import { Box, Typography } from '@mui/material';
import { FC, memo } from 'react';

import { styles } from './styles';
import { StyledButton } from 'src/UI/StyledButton';
import { CustomBox } from 'src/UI/CustomBox';
import { QuizShortInfoType } from 'src/types/quiz';
import { useNavigate } from 'react-router-dom';

export interface QuizCardProps {
  quiz: QuizShortInfoType;
}

export const QuizCard: FC<QuizCardProps> = memo(({quiz}) => {
  const navigate = useNavigate();
  
  const handleQuizClick = () => {
    navigate(`/quizzes/${quiz.quiz_id}`);
  };

  return (
    <CustomBox style={styles.root}>
        <Box sx={styles.textContent}>
            <Box sx={styles.text}>
                <Typography variant="h3" textAlign="center">{quiz.quiz_title}</Typography>
                <Typography variant="h6">{quiz.quiz_author}</Typography>
            </Box>
            <StyledButton title="Go to Quiz" onClick={handleQuizClick} />
        </Box>
    </CustomBox>
  );
});