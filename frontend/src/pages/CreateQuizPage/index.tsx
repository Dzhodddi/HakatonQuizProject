import { FC } from "react";
import Container from "@mui/material/Container";

import { CreateQuizSection } from "src/modules/CreateQuizzes";

import { styles } from "./styles";

interface CreateQuizPageProps {}

export const CreateQuizPage: FC<CreateQuizPageProps> = () => {
  return (
    <Container sx={styles.root} maxWidth={false}>
      <CreateQuizSection />
    </Container>
  );
};