import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button, Divider, List, ListItem, ListItemText } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useCommonData } from "../providers/data";
import DeleteIcon from "@mui/icons-material/Delete";
import { Stack } from "@mui/system";

export default function TeamCard({ teamName, members, id, membersGrades }) {
  const { topics, deleteTeam } = useCommonData();
  return (
    <Card sx={{ minWidth: 260, borderRadius: "16px" }}>
      <CardContent>
        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
          {teamName}
        </Typography>
        <Typography variant="h6" component="div">
          Members:
        </Typography>

        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {members.map((member) => (
            <Typography key={member} variant="subtitle1" gutterBottom>
              {member.name}
              <Stack>
                {membersGrades
                  ?.filter((x) => x.studentId == member.email)
                  ?.map(
                    (grade) =>
                      `${
                        topics.filter((topic) => topic.id == grade.topicId)[0]
                          .name
                      } : ${grade.grade}`
                  )}
              </Stack>
            </Typography>
          ))}
        </List>

        <div style={{ display: "flex" }}>
          <Link href={topics?.length == 0 ? {} : `/team-grade/${id}`}>
            <Button
              variant="outlined"
              color="primary"
              endIcon={<CloudUploadIcon />}
              size="small"
              disabled={topics?.length == 0}
            >
              Grade
            </Button>
          </Link>
          <Button
            variant="outlined"
            color="error"
            endIcon={<DeleteIcon />}
            size="small"
            sx={{ ml: "1rem" }}
            onClick={() => {
              deleteTeam(id);
            }}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
