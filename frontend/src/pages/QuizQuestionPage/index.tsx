import { FC } from "react";
import Container from "@mui/material/Container";

import { useParams } from "react-router-dom";

import { QuizQuestionSection } from "src/modules/QuizQuestion";

import { styles } from "./styles";

interface QuizQuestionPageProps {}

export const QuizQuestionPage: FC<QuizQuestionPageProps> = () => {
    const { quizId, questionId } = useParams();
  return (
    <Container sx={styles.root} maxWidth={false}>
      <QuizQuestionSection quizId={Number(quizId)} questionId={Number(questionId)} />
    </Container>
  );
};