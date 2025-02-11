import { Box, Typography } from '@mui/material';
import { FC, memo, useState } from 'react';

import { StyledButton } from 'src/UI/StyledButton';
import { CustomTextField } from 'src/UI/CustomTextField';
import { CustomBox } from 'src/UI/CustomBox';
import { styles } from './styles';
import { useNavigate } from 'react-router-dom';
import { useNewQuiz } from '../../store/useNewQuiz';
import { useUserStore } from 'src/modules/Login/store/useUserStore';

export interface CreateQuizSectionProps {}

export const CreateQuizSection: FC<CreateQuizSectionProps> = memo(() => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [titleError, setTitleError] = useState("");
    const navigate = useNavigate();
    const { setNewQuiz } = useNewQuiz();
    const { user } = useUserStore();

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const onAddQuestionsClick = () => {
        if (title === "") {
            setTitleError("Title is required");
            return;
        }

        setTitleError("");

        setNewQuiz({
            id: 0,
            title,
            description,
            authorId: Number(user.id),
            questions: [],
        });

        navigate("/create-quiz/questions");
    };

  return (
        <CustomBox>
            <Typography variant="h1">Create Quiz</Typography>

            <Box sx={styles.textFieldGroup}>
                <CustomTextField label="Title" value={title} onChange={handleTitleChange} error={titleError !== ""} errorText={titleError} maxLength={25} />

                <CustomTextField label="Description" value={description} isMultiline={true} onChange={handleDescriptionChange} maxLength={100} />
            </Box>

            <StyledButton title="Add questions" onClick={onAddQuestionsClick} />
        </CustomBox>
  );
});