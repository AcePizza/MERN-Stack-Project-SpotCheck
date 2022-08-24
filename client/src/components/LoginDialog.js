import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";

export default function AlertDialog({
  openDialog,
  resultsFromFetch,
  fromChildSetOpenDialog,
}) {
  const [open, setOpen] = React.useState(openDialog);
  const redirectTO = useNavigate();

  const handleClose = () => {
    if (resultsFromFetch.status === 200) {
      redirectTO("/home");
    } else {
      redirectTO("/login");
      fromChildSetOpenDialog(false);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {resultsFromFetch && resultsFromFetch.response.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {resultsFromFetch && resultsFromFetch.response.msg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
