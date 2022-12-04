import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Slide from "@mui/material/Slide";
import { MenuItem, Typography } from "@mui/material";
import UploadJuriesAndTeams from "./UploadJuriesAndTeams";
import { useCommonData } from "../providers/data";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UploadJuriesAndTeamsMenuItem({ onOpen = () => {} }) {
  const [open, setOpen] = React.useState(false);
  const { isTeamsLoading } = useCommonData();

  const handleClickOpen = () => {
    onOpen();
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
        aria-describedby={`alert-dialog-slide-description ${isTeamsLoading}`}
      >
        <DialogContent>
          <UploadJuriesAndTeams
            close={() => {
              handleClose();
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
