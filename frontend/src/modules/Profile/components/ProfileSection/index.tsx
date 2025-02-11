import { Typography } from '@mui/material';
import { FC, memo, useEffect} from 'react';

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
    const { photo, getLogo, loading, deleteAccount } = useProfileData();
    const navigate = useNavigate();

    const onDeleteAccount = async () => {
        const isDeleted = await deleteAccount(Number(user.id));
        if (isDeleted) {
            navigate("/login");
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
            {photo !== "" && <img src={photo} alt="profile" />}
        
            <Typography variant="h1">{`${user.first_name} ${user.second_name}`}</Typography>

            <Typography variant="h4">{user.email}</Typography>

            <StyledButton title="Delete account" onClick={onDeleteAccount} color="mainPalette.red"/>
        </CustomBox>
  );
});