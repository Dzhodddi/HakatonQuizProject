import { Box, Typography } from '@mui/material';
import { FC, memo } from 'react';

import { styles } from './styles';
import { StyledButton } from 'src/UI/StyledButton';
import { useNavigate } from 'react-router-dom';

export interface HeaderProps {}

export const Header: FC<HeaderProps> = memo(() => {
  const navigate = useNavigate();
  return (
    <Box sx={styles.root}>
        <Typography variant="h2"color="mainPalette.white">Quizzes App</Typography>

        <Box sx={styles.buttonGroup}>
            <StyledButton title="Create Quiz" onClick={() => navigate("/create-quiz")} color="mainPalette.white" textColor="mainPalette.darkBlue"/>

            <StyledButton title="My Profile" onClick={() => navigate("/profile")} color="mainPalette.white" textColor="mainPalette.darkBlue"/>
        </Box>
    </Box>
  );
});