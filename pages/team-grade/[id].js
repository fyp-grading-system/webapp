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
import { useCommonData } from "../../providers/data";
import styles from "../../styles/Home.module.css";
import Divider from "@mui/material/Divider";
import LoadingButton from "@mui/lab/LoadingButton";

export default function UploadUserGrade() {
  const { teams, topics, submitTeamGrades } = useCommonData();
  const router = useRouter();
  const { name, id } = router.query;
  const [result, setResult] = useState({});
  const team = teams.find((x) => x.id == id);
  const [isLoading, setIsLoading] = useState(false);

  const handleTopicChange = (e, studentId) => {
    setResult((oldResult) => {
      const newResult = { ...oldResult };
      const topicId = e.target.name.split("|")[0];
      newResult[e.target.name] = {
        studentId,
        grade: e.target.value,
        topicId,
      };
      return newResult;
    });
  };

  const submit = async () => {
    setIsLoading(true);
    const listOfGrades = Object.keys(result).map((key) => result[key]);
    await submitTeamGrades(listOfGrades, id);
    setIsLoading(false);
    router.push("/teams");
  };

  const canSubmit =
    Object.keys(result).length == team?.members?.length * topics.length;

  return (
    <div>
      <Head>
        <title>Grading System</title>
        <meta
          name="description"
          content="this is an app to manage final year project grades"
        />
      </Head>

      <Container maxWidth="xl" className={styles.teamsContainer}>
        <Typography variant="h5" color="text.primary" sx={{ mb: "2rem" }}>
          Team's Subject: {team?.subjectName}
        </Typography>

        {team?.members?.map((member) => (
          <div key={member.id} style={{ paddingBottom: "3rem" }}>
            <Divider sx={{ mb: "1rem" }}>
              <div>
                <Typography variant="body1" color="text.secondary">
                  Student Name: {member.name}
                </Typography>
              </div>
            </Divider>
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
                          name={`${topic.id}|${member.email}`}
                          onChange={(e) => handleTopicChange(e, member.email)}
                          value={
                            result[`${topic.id}|${member.email}`]?.grade || ""
                          }
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
          </div>
        ))}
        <LoadingButton
          disabled={!canSubmit}
          sx={{ mt: "2rem" }}
          variant="outlined"
          color="primary"
          onClick={submit}
          loading={isLoading}
        >
          Submit
        </LoadingButton>
      </Container>
    </div>
  );
}
