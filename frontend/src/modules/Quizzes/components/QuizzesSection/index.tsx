import { Box } from '@mui/material';
import { FC, memo } from 'react';
import { QuizCard } from '../QuizCard';

import { styles } from './styles';

export interface QuizzesSectionProps {}

export const QuizzesSection: FC<QuizzesSectionProps> = memo(() => {
  return (
    <Box sx={styles.root}>
        <QuizCard />

        <QuizCard />

        <QuizCard />

        <QuizCard />

        <QuizCard />

        <QuizCard />
    </Box>
  );
});
