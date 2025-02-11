import { Box } from '@mui/material';
import { FC, memo, useEffect } from 'react';
import { QuizCard } from '../QuizCard';

import { styles } from './styles';
import { useQuizzesData } from '../../hooks/useQuizzesData';

export interface QuizzesSectionProps {}

export const QuizzesSection: FC<QuizzesSectionProps> = memo(() => {
  const { quizzes, fetchQuizzes } = useQuizzesData();

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <Box sx={styles.root}>
      {quizzes.map((quiz, index) => (
        <QuizCard key={index} quiz={quiz} />
      ))}
    </Box>
  );
});
