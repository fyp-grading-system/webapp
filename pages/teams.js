import { Box, Button, Grid, Typography } from "@mui/material";
import { Container, style } from "@mui/system";
import Head from "next/head";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import TeamCard from "../components/TeamCard";
import { TopBar } from "../components/TopBar";
import UploadJuriesAndTeamsMenuItem from "../components/UploadJuriesAndTeamsMenuItem";
import styles from "../styles/Home.module.css";

const fileTypes = ["XLSX"];

export default function Teams() {
  const [teams, setTeams] = useState([
    {
      name: "Team1",
      id: 1,
      members: [
        {
          fullName: "Hassan Katbay",
          id: 1231,
        },
        {
          fullName: "Yammine Yammine",
          id: 1232,
        },
        {
          fullName: "Karim Falakha",
          id: 1232,
        },
      ],
    },
    {
      name: "Team2",
      id: 2,
      members: [
        {
          fullName: "Hassan Katbay",
          id: 1331,
        },
        {
          fullName: "Yammine Yammine",
          id: 1332,
        },
        {
          fullName: "Karim Falakha",
          id: 1332,
        },
      ],
    },
  ]);

  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Head>
        <title>Grading System</title>
        <meta
          name="description"
          content="this is an app to manage final year project grades"
        />
      </Head>

      <TopBar />

      <Container maxWidth="xl" className={styles.teamsContainer}>
        {teams.length > 0 ? (
          <Grid sx={{ flexGrow: 1 }} container spacing={2}>
            {teams.map((team) => (
              <Grid item xs={12} md={6} key={team.id}>
                <TeamCard teamName={team.name} members={team.members} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box textAlign="center">
            <Typography variant="h6" component="div">
              No Teams Available.
            </Typography>
          </Box>
        )}
      </Container>
    </div>
  );
}
