import { Typography } from '@mui/material';
import { FC, memo} from 'react';

import { StyledButton } from 'src/UI/StyledButton';
import { CustomBox } from 'src/UI/CustomBox';

import { useNavigate } from 'react-router-dom';

import { styles } from './styles';

export interface CreateQuizSuccessProps {}

export const CreateQuizSuccessSection: FC<CreateQuizSuccessProps> = memo(() => {
    const navigate = useNavigate();
    const onSubmit = () => {
        navigate("/quizzes");
    };
  return (
        <CustomBox style={styles.root}>
            <Typography variant="h1">Success Creating Quiz</Typography>

            <Typography variant="h4">Your quiz has been created successfully!</Typography>

            <StyledButton title="Back to quizzes" onClick={onSubmit} />
        </CustomBox>
  );
});