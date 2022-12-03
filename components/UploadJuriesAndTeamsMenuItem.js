import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { FileUploader } from "react-drag-drop-files";
import { MenuItem, Typography } from "@mui/material";
import { useState } from "react";

const fileTypes = ["XLSX"];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UploadJuriesAndTeamsMenuItem() {
  const [open, setOpen] = React.useState(false);
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
      <MenuItem onClick={handleClickOpen}>
        <Typography textAlign="center">Add Juries and Teams</Typography>
      </MenuItem>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <FileUploader
            handleChange={handleChange}
            name="file"
            types={fileTypes}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
