import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog({ openDialog, resultsFromFetch }) {
  const [open, setOpen] = React.useState(openDialog);

  console.log("openDialog", openDialog);
  console.log("resultsFromFetch", resultsFromFetch);

  const handleClose = () => {
    setOpen(false);
  };

  // HandleClose needs to send data to parent. So this function needs to be created in the parent and sent via props (Stuff for later)

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">User logged in</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {resultsFromFetch &&
              `${resultsFromFetch.msg}. The user ${resultsFromFetch.user.emailadress} was logged in`}
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
