import { Box, Button, TextField, Typography } from '@mui/material';
import { FC, memo, useState } from 'react';

import { styles } from './styles';
import { useNavigate } from 'react-router-dom';
import { useLoginData } from '../../hooks/useLoginData';

export interface LoginSectionProps {
    type: "login" | "signup";
}

export const LoginSection: FC<LoginSectionProps> = memo(({ type }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const { loading, apiError, postRegister } = useLoginData();

    const handleNavigation = () => {
        if (type === "login") {
            navigate('/signup');
        } else {
            navigate('/login');
        }
    };

    const handleFirstNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    };

    const onSignUpContinue = async () => {
        const response = await postRegister(firstName, lastName, email, password);
        
        if (response) {
            navigate('/quizzes');
        }
    };


  return (
    <Box sx={styles.root}>
        <Box sx={styles.form}>
            <Typography variant="h1">{type === "login" ? "Login" : "Sign Up"}</Typography>

            <Box sx={styles.textFieldGroup}>
               {type === "signup" && (
                 <Box sx={styles.nameTextFieldGroup}>
                    <TextField label="First Name" sx={[styles.textField, styles.halfTextField]} value={firstName} onChange={handleFirstNameChange} />

                    <TextField label="Last Name" sx={[styles.textField, styles.halfTextField]} value={lastName} onChange={handleLastNameChange}/>
                </Box>)}

                <TextField label="Email" sx={styles.textField} value={email} onChange={handleEmailChange}/>

                <TextField label="Password" type="password" sx={styles.textField} value={password} onChange={handlePasswordChange} />

                {type === "signup" && (
                    <TextField label="Confirm Password" type="password" sx={styles.textField} />
                )}
            </Box>

            <Button variant="contained" sx={styles.button} size="large" onClick={type === "signup" ? onSignUpContinue : ()=> navigate("/quizzes")}>Continue</Button>

            <Box sx={styles.link}>
                <Typography variant="body1">
                    {type === "login" ? "Don't have an account?" : "Already have an account?"}
                </Typography>

                <Button variant="text" sx={styles.linkButton} onClick={handleNavigation}>
                    {type === "login" ? "Sign Up" : "Login"}
                </Button>
            </Box>
        </Box>
    </Box>
  );
});
