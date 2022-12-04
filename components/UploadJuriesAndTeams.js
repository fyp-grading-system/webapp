import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { FileUploader } from "react-drag-drop-files";
import { useCommonData } from "../providers/data";
import { LinearProgress } from "@mui/material";

const fileTypes = ["CSV"];

export default function UploadJuriesAndTeams({ close = () => {} }) {
  const { uploadPercentage, isUploading, uploadFile } = useCommonData();

  return (
    <div className="upload">
      {isUploading ? (
        <LinearProgress value={uploadPercentage} />
      ) : (
        <FileUploader
          label="Add teams and juries using a csv"
          handleChange={(file) => {
            uploadFile(file);
            close();
          }}
          name="file"
          types={fileTypes}
        />
      )}
    </div>
  );
}
