import { Box, Button, Typography } from "@mui/material";
import { FC, memo } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginData } from "../../hooks/useLoginData";
import { CustomTextField } from "src/UI/CustomTextField";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSignUpSchema } from "../../constants";
import { styles } from "./styles";

export interface SignUpProps {}

export const SignUp: FC<SignUpProps> = memo(() => {
  const navigate = useNavigate();
  const { loading, apiError, postRegister } = useLoginData();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSignUpSchema),
    mode: "onBlur",
  });

  const onSignUpContinue = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    const response = await postRegister(
      data.firstName,
      data.lastName,
      data.email,
      data.password
    );

    if (response) {
      navigate("/quizzes");
    }
  };

  return (
    <Box sx={styles.root}>
      <Box sx={styles.form}>
        <Typography variant="h1">Sign Up</Typography>

        <Box sx={styles.textFieldGroup}>
          <Box sx={styles.nameTextFieldGroup}>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <CustomTextField
                  isHalf
                  label="First Name"
                  {...field}
                  error={!!errors.firstName}
                  errorText={errors.firstName?.message}
                />
              )}
            />

            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <CustomTextField
                  isHalf
                  label="Last Name"
                  {...field}
                  error={!!errors.lastName}
                  errorText={errors.lastName?.message}
                />
              )}
            />
          </Box>

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

          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <CustomTextField
                label="Confirm Password"
                type="password"
                {...field}
                error={!!errors.confirmPassword}
                errorText={errors.confirmPassword?.message}
              />
            )}
          />
        </Box>

        {apiError && (
          <Typography variant="body1" sx={styles.error}>
            {apiError}
          </Typography>
        )}

        <Button
          loading={loading}
          variant="contained"
          sx={styles.button}
          size="large"
          onClick={handleSubmit(onSignUpContinue)}
        >
          Continue
        </Button>

        <Box sx={styles.link}>
          <Typography variant="body1">Already have an account?</Typography>
          <Button
            variant="text"
            sx={styles.linkButton}
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
});
