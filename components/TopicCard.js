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

export default function TopicCard({ topicName, percentage, description, id }) {
  const { deleteTopic } = useCommonData();

  return (
    <Card sx={{ minWidth: 260, borderRadius: "16px" }}>
      <CardContent>
        <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
          {topicName}
        </Typography>
        <Typography variant="body1" component="div">
          {description}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Percentage: {percentage}
        </Typography>

        <Button
          variant="outlined"
          color="error"
          endIcon={<DeleteIcon />}
          size="small"
          onClick={() => deleteTopic(id)}
        >
          Delete
        </Button>
      </CardContent>
    </Card>
  );
}
