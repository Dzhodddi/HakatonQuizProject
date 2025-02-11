import { FC } from "react";

import { CircularProgress, Container } from "@mui/material";
import { styles } from "./styles";

export interface LoaderProps {}

export const Loader: FC<LoaderProps> = () => {
  return (
    <Container sx={styles.root}>
      <CircularProgress sx={styles.loader} />
    </Container>
  );
};