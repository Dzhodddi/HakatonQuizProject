import { FC } from "react";

import { LoginSection } from "src/modules/Login";
import Container from "@mui/material/Container";
import { styles } from "./styles";

interface SignUpPageProps {}

export const SignUpPage: FC<SignUpPageProps> = () => {
  return (
    <Container sx={styles.root} maxWidth={false}>
      <LoginSection type="signup" />
    </Container>
  );
};