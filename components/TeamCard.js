import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button, Divider, List, ListItem, ListItemText } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

export default function TeamCard({ teamName, members }) {
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
            <ListItem key={member.id} alignItems="flex-start">
              <ListItemText
                primary={
                  <Typography variant="subtitle1" gutterBottom>
                    {member.fullName}
                  </Typography>
                }
              />
              <Link href={`/user-grade/${member.id}?name=${member.fullName}`}>
                <Button
                  variant="outlined"
                  color="primary"
                  endIcon={<CloudUploadIcon />}
                  size="small"
                >
                  Grade
                </Button>
              </Link>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
