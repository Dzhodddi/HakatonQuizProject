import { FC } from "react";
import Container from "@mui/material/Container";

import { CreateQuestionsSection } from "src/modules/CreateQuestions";

import { styles } from "./styles";

interface CreateQuestionsPageProps {}

export const CreateQuestionsPage: FC<CreateQuestionsPageProps> = () => {
  return (
    <Container sx={styles.root} maxWidth={false}>
      <CreateQuestionsSection />
    </Container>
  );
};