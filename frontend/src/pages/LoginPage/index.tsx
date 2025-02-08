import { FC } from "react";

import { LoginSection } from "src/modules/Login";
import Container from "@mui/material/Container";
import { styles } from "./styles";

interface LoginPageProps {}

export const LoginPage: FC<LoginPageProps> = () => {
  return (
    <Container sx={styles.root} maxWidth={false}>
      <LoginSection type="login" />
    </Container>
  );
};