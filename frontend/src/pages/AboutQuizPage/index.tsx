import { FC } from "react";
import Container from "@mui/material/Container";

import { AboutQuizSection } from "src/modules/AboutQuiz";
import { useParams } from "react-router-dom";

import { styles } from "./styles";

interface AboutQuizPageProps {}

export const AboutQuizPage: FC<AboutQuizPageProps> = () => {
    const { quizId } = useParams();
  return (
    <Container sx={styles.root} maxWidth={false}>
      <AboutQuizSection quizId={quizId ?? ""} />
    </Container>
  );
};