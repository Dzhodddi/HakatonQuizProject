import { Box, Button, Typography } from '@mui/material';
import { FC, memo, useEffect, useState} from 'react';

import { CustomBox } from 'src/UI/CustomBox';

import { useUserStore } from 'src/modules/Login/store/useUserStore';

import { styles } from './styles';
import { useProfileData } from '../../hooks/useProfileData';
import { Loader } from 'src/components/Loader';
import { StyledButton } from 'src/UI/StyledButton';
import { useNavigate } from 'react-router-dom';

export interface ProfileSectionProps {}

export const ProfileSection: FC<ProfileSectionProps> = memo(() => {
    const { user } = useUserStore();
    const { photo, getLogo, loading, deleteAccount, getQuizHistory, quizHistory } = useProfileData();
    const navigate = useNavigate();

    const onDeleteAccount = async () => {
        const isDeleted = await deleteAccount(Number(user.id));
        if (isDeleted) {
            navigate("/login");
        }
    };

    useEffect(() => {
        void getLogo(Number(user.id));
        void getQuizHistory(Number(user.id));
    }, [user.id]);

    if (loading) {
        return <Loader />;
    }

  return (
        <CustomBox style={styles.root}>
            {photo !== "" && <img src={"https://www.pryano.com.ua/wp-content/uploads/2015/07/Profile_avatar_placeholder_large.png"} alt="profile" style={styles.image}/>}
        
            <Box sx={styles.personalInfo}>
                <Typography variant="h1">{`${user.first_name} ${user.second_name}`}</Typography>

                <Typography variant="h4" textAlign="center">{user.email}</Typography>
            </Box>

            <Box sx={styles.history}>
                <Typography variant="h4">Quiz history:</Typography>

                {quizHistory.map((quiz, index) => (
                    <Typography key={index} variant="h6">{quiz}</Typography>
                ))}
            </Box>

            <StyledButton title="Delete account" onClick={onDeleteAccount} color="mainPalette.red"/>
        </CustomBox>
  );
});