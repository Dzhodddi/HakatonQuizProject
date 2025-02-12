import { Button, Typography } from '@mui/material';
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
    const { photo, getLogo, loading, deleteAccount, postLogo } = useProfileData();
    const navigate = useNavigate();

    const onDeleteAccount = async () => {
        const isDeleted = await deleteAccount(Number(user.id));
        if (isDeleted) {
            navigate("/login");
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            void postLogo(Number(user.id), event.target.files[0]);
        }
    };

    useEffect(() => {
        void getLogo(Number(user.id));
    }, [user.id]);

    if (loading) {
        return <Loader />;
    }

  return (
        <CustomBox style={styles.root}>
            {photo !== "" && <img src={photo} alt="profile" style={styles.image}/>}

            <Button variant="contained" color="primary" component="label">
                Upload photo
                <input type="file" hidden onChange={handleFileChange} />
            </Button>
        
            <Typography variant="h1">{`${user.first_name} ${user.second_name}`}</Typography>

            <Typography variant="h4">{user.email}</Typography>

            <StyledButton title="Delete account" onClick={onDeleteAccount} color="mainPalette.red"/>
        </CustomBox>
  );
});