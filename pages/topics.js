import styles from "../styles/Home.module.css";
import * as React from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Alert, Box, Container, Grid, Stack, Typography } from "@mui/material";
import TopicCard from "../components/TopicCard";
import { useCommonData } from "../providers/data";
import CircularProgress from "@mui/material/CircularProgress";

export default function Topics() {
  const [open, setOpen] = React.useState(false);
  const { topics, isTopicsLoading, createTopic } = useCommonData();
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [percentage, setPercentage] = React.useState("");
  const [isCreating, setIsCreating] = React.useState(false);

  const handleChange = (e) => {
    if (e.target.name == "name") setName(e.target.value);
    if (e.target.name == "description") setDescription(e.target.value);
    if (e.target.name == "percentage") setPercentage(e.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submit = async () => {
    setIsCreating(true);
    await createTopic({ name, description, percentage });
    setIsCreating(false);
    handleClose();
    setName("");
    setDescription("");
    setPercentage("");
  };

  const canSubmit = name != "" && description != "" && percentage != "";

  if (isTopicsLoading) {
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
          <CircularProgress
            size={40}
            thickness={4}
            value={70}
          />
        </Box>
      </Container>
    );
  } else {
    return (
      <div className={styles.container}>
        <Container className={styles.teamsContainer}>
          {topics?.length > 0 ? (
            <>
              <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                {topics?.map((topic) => (
                  <Grid item xs={12} md={4} lg={3} key={topic.id}>
                    <TopicCard
                      topicName={topic.name}
                      description={topic.description}
                      percentage={topic.percentage}
                      id={topic.id}
                    />
                  </Grid>
                ))}
              </Grid>
              <Button
                variant="outlined"
                onClick={handleClickOpen}
                sx={{ mt: "1rem" }}
              >
                Add Topic
              </Button>
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
              <Stack sx={{ width: "100%", mb: "1rem" }} spacing={2}>
                <Alert severity="warning">No Topics available!</Alert>
              </Stack>
              <Button
                variant="outlined"
                sx={{ ml: "1rem" }}
                onClick={handleClickOpen}
              >
                Add Topic
              </Button>
            </Box>
          )}
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Create Topic</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                name="name"
                id="name"
                label="Name"
                fullWidth
                variant="standard"
                value={name}
                onChange={handleChange}
              />
              <TextField
                autoFocus
                margin="dense"
                name="description"
                id="description"
                label="Description"
                fullWidth
                variant="standard"
                value={description}
                onChange={handleChange}
              />
              <TextField
                autoFocus
                margin="dense"
                name="percentage"
                id="name"
                label="Percentage"
                fullWidth
                variant="standard"
                value={percentage}
                onChange={handleChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <LoadingButton
                onClick={submit}
                disabled={!canSubmit}
                loading={isCreating}
              >
                Create
              </LoadingButton>
            </DialogActions>
          </Dialog>
        </Container>
      </div>
    );
  }
}

function FormDialog() {
  return <div></div>;
}
