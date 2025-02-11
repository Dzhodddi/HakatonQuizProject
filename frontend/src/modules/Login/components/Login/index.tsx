import { Box, Button, Typography } from "@mui/material";
import { FC, memo } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginData } from "../../hooks/useLoginData";
import { CustomTextField } from "src/UI/CustomTextField";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationLoginSchema } from "../../constants";
import { styles } from "./styles";

export interface LoginProps {}

export const Login: FC<LoginProps> = memo(() => {
  const navigate = useNavigate();
  const { loading, apiError, postLogin } = useLoginData();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationLoginSchema),
    mode: "onBlur",
  });

  const onLoginContinue = async (data: { email: string; password: string }) => {
    const response = await postLogin(data.email, data.password);
    if (response) {
      navigate("/quizzes");
    }
  };

  return (
    <Box sx={styles.root}>
      <Box sx={styles.form}>
        <Typography variant="h1">Login</Typography>

        <Box sx={styles.textFieldGroup}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <CustomTextField
                label="Email"
                {...field}
                error={!!errors.email}
                errorText={errors.email?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <CustomTextField
                label="Password"
                type="password"
                {...field}
                error={!!errors.password}
                errorText={errors.password?.message}
              />
            )}
          />
        </Box>

        <Button
          loading={loading}
          variant="contained"
          sx={styles.button}
          size="large"
          onClick={handleSubmit(onLoginContinue)}
        >
          Continue
        </Button>

        {apiError && (
          <Typography variant="body1" sx={styles.error}>
            {apiError}
          </Typography>
        )}

        <Box sx={styles.link}>
          <Typography variant="body1">Don't have an account?</Typography>
          <Button variant="text" sx={styles.linkButton} onClick={() => navigate("/signup")}>
            Sign Up
          </Button>
        </Box>
      </Box>
    </Box>
  );
});
