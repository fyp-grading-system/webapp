import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useSession, signIn, signOut } from "next-auth/react";
import { TopBar } from "./TopBar";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { DataProvider } from "../providers/data";

export default function Guard({ children }) {
  const { data: session } = useSession();

  if (session)
    return (
      <DataProvider>
        <TopBar />

        <Container maxWidth="xl">{children}</Container>
      </DataProvider>
    );

  return (
    <>
      <TopBar />

      <Container maxWidth="xl" className={styles.teamsContainer}>
        <Grid sx={{ flexGrow: 1 }} container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" sx={{ mb: "1rem" }}>
              Easily manage grades
            </Typography>
            <Typography variant="body1">
              Manage all your student details, enrol students into courses and
              track their academic progress through the grading of assessments.
              You can also create your own data capture fields to make sure you
              capture all the student data needed. Create bar-coded student
              cards, record student absenteeism, upload important documents like
              ID copies, and much more.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ borderRadius: "16px" }}>
              <img src="/demo.png" alt="demo" width={"100%"} />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
