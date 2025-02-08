import { FC } from "react";
import Container from "@mui/material/Container";
import { QuizzesSection } from "src/modules/Quizzes";
import { Header } from "src/components/Header";
import { styles } from "./styles";

interface QuizzesPageProps {}

export const QuizzesPage: FC<QuizzesPageProps> = () => {
  return (
    <Container sx={styles.root} maxWidth={false}>
        <Header />
        <QuizzesSection />
    </Container>
  );
};