import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { Container, style } from "@mui/system";
import Head from "next/head";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import TeamCard from "../components/TeamCard";
import { TopBar } from "../components/TopBar";
import UploadJuriesAndTeams from "../components/UploadJuriesAndTeams";
import UploadJuriesAndTeamsMenuItem from "../components/UploadJuriesAndTeamsMenuItem";
import { useCommonData } from "../providers/data";
import styles from "../styles/Home.module.css";
import CircularProgress from "@mui/material/CircularProgress";
import { DownloadTemplate } from "../components/DownloadTemplate";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Alert from "@mui/material/Alert";

export default function Teams() {
  const { teams, isTeamsLoading, topics } = useCommonData();
  console.log(teams)
  if (isTeamsLoading) {
    return (
      <Container className={styles.teamsContainer}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
          className="box"
        >
          <CircularProgress size={40} thickness={4} value={70} />
        </Box>
      </Container>
    );
  } else {
    return (
      <>
        <Head>
          <title>Grading System</title>
          <meta
            name="description"
            content="this is an app to manage final year project grades"
          />
        </Head>

        <Container className={styles.teamsContainer}>
          <Box
            textAlign="center"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              mb: "2rem",
            }}
          >
            <Typography variant="subtitle1" component="div" sx={{ mb: "1rem" }}>
              <DownloadTemplate />
            </Typography>

            <UploadJuriesAndTeams />
          </Box>
          {teams?.length > 0 ? (
            <>
              {topics?.length == 0 && (
                <Stack sx={{ width: "100%", mb: "1rem" }} spacing={2}>
                  <Alert severity="error">
                    Grading students requires topics, please create topics and
                    try again!
                  </Alert>
                </Stack>
              )}
              <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                {teams?.map((team) => (
                  <Grid item xs={12} md={4} lg={3} key={team.id}>
                    <TeamCard
                      teamName={team.subjectName}
                      members={team.members}
                      membersGrades={team?.grades}
                      id={team.id}
                    />
                  </Grid>
                ))}
              </Grid>
            </>
          ) : (
            <Box
              textAlign="center"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Stack sx={{ width: "100%" }} spacing={2}>
                <Alert severity="warning">No teams available to grade!</Alert>
              </Stack>
            </Box>
          )}
        </Container>
      </>
    );
  }
}
