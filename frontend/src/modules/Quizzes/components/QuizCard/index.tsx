import { Box, Typography } from '@mui/material';
import { FC, memo } from 'react';

import { styles } from './styles';
import { StyledButton } from 'src/UI/StyledButton';
import { CustomBox } from 'src/UI/CustomBox';

export interface QuizCardProps {}

export const QuizCard: FC<QuizCardProps> = memo(() => {
  return (
    <CustomBox style={styles.root}>
        <Box sx={styles.textContent}>
            <Box sx={styles.text}>
                <Typography variant="h3">Quiz Title</Typography>
                <Typography variant="h6">By Quiz Author</Typography>
            </Box>
            <StyledButton title="Go to Quiz" onClick={()=>{}} />
        </Box>
    </CustomBox>
  );
});