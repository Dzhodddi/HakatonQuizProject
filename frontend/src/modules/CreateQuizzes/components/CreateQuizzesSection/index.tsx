import { Box, Typography } from '@mui/material';
import { FC, memo, useState } from 'react';

import { StyledButton } from 'src/UI/StyledButton';
import { CustomTextField } from 'src/UI/CustomTextField';
import { CustomBox } from 'src/UI/CustomBox';
import { styles } from './styles';

export interface CreateQuizSectionProps {}

export const CreateQuizSection: FC<CreateQuizSectionProps> = memo(() => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

  return (
        <CustomBox style={styles.root}>
            <Typography variant="h1">Create Quiz</Typography>

            <Box sx={styles.textFieldGroup}>
                <CustomTextField label="Title" value={title} onChange={handleTitleChange}/>

                <CustomTextField label="Description" value={description} isMultiline={true} onChange={handleDescriptionChange} />
            </Box>

            <StyledButton title="Add question" onClick={()=>{}} />
        </CustomBox>
  );
});