import { FC } from "react";
import Container from "@mui/material/Container";

import { QuizResultsSection } from "src/modules/QuizResults";
import { styles } from "./styles";

interface QuizResultsPageProps {}

export const QuizResultsPage: FC<QuizResultsPageProps> = () => {
  return (
    <Container sx={styles.root} maxWidth={false}>
      <QuizResultsSection />
    </Container>
  );
};