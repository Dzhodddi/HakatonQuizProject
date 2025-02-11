import { FC } from "react";

import Container from "@mui/material/Container";
import { ProfileSection } from "src/modules/Profile";
import { styles } from "./styles";

interface ProfilePageProps {}

export const ProfilePage: FC<ProfilePageProps> = () => {
  return (
    <Container sx={styles.root} maxWidth={false}>
      <ProfileSection />
    </Container>
  );
};