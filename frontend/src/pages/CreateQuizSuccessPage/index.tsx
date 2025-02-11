import { FC } from "react";
import Container from "@mui/material/Container";

import { CreateQuizSuccessSection } from "src/modules/CreateQuizSuccess";
import { styles } from "./styles";

interface CreateQuizSuccessPageProps {}

export const CreateQuizSuccessPage: FC<CreateQuizSuccessPageProps> = () => {
  return (
    <Container sx={styles.root} maxWidth={false}>
      <CreateQuizSuccessSection />
    </Container>
  );
};