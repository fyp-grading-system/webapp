import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { TopBar } from "../../components/TopBar";
import styles from "../../styles/Home.module.css";

export default function UploadUserGrade() {
  const [topics, setTopics] = useState([
    {
      name: "topic1",
      id: 1,
    },
    {
      name: "topic2",
      id: 2,
    },
    {
      name: "topic3",
      id: 3,
    },
  ]);
  const [result, setResult] = useState({});
  const router = useRouter();
  const { name, id } = router.query;

  const handleTopicChange = (e) => {
    setResult((oldResult) => {
      const newResult = { ...oldResult };
      newResult[e.target.name] = e.target.value;
      return newResult;
    });
  };

  const canSubmit = Object.keys(result).length == topics.length;

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
        <Typography sx={{ mb: "1rem" }} variant="h6" color="text.primary" gutterBottom>
          Student Name: {name} | Matricule: {id}
        </Typography>
        <Typography sx={{ mb: "1rem" }} variant="h6" color="text.primary" gutterBottom>
          Grades:
        </Typography>
        <Grid sx={{ flexGrow: 1 }} container spacing={2}>
          {topics.map((topic) => (
            <Grid item xs={12} md={6} lg={4} key={topic.id}>
              <Card sx={{ minWidth: 260, borderRadius: "16px" }}>
                <CardContent>
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      {topic.name}
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name={`${topic.id}`}
                      onChange={handleTopicChange}
                      value={result[topic.id] || ""}
                    >
                      <FormControlLabel
                        value="a"
                        control={<Radio />}
                        label="A"
                      />
                      <FormControlLabel
                        value="b"
                        control={<Radio />}
                        label="B"
                      />
                      <FormControlLabel
                        value="c"
                        control={<Radio />}
                        label="C"
                      />
                    </RadioGroup>
                  </FormControl>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Button
          disabled={!canSubmit}
          sx={{ mt: "2rem" }}
          variant="outlined"
          color="primary"
        >
          Submit
        </Button>
      </Container>
    </div>
  );
}
