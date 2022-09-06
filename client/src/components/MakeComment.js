import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextareaAutosize, TextField } from "@mui/material";
import jwtDecode from "jwt-decode";

export default function MakeComment({ openDialog, currentSpot }) {
  const [open, setOpen] = React.useState(openDialog);
  const [commentText, setCommentText] = useState({});

  const handleClose = () => {
    setOpen(false);
  };

  const commentHandler = (e) => {
    setCommentText({ ...commentText, [e.target.name]: e.target.value });
  };

  const getCurrentUser = () => {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    return decoded.sub;
  };

  const commentButtonHandler = async () => {
    const user = getCurrentUser();
  };

  console.log("currentSpot", currentSpot);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Please write a comment
        </DialogTitle>
        <DialogContent>
          <TextareaAutosize
            minRows={4}
            maxRows={4}
            aria-label="maximum height"
            placeholder="Maximum 4 rows"
            name="comment"
            value={commentText.comment ? commentText.comment : ""}
            onChange={commentHandler}
            style={{ width: 290 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={commentButtonHandler} autoFocus>
            Comment
          </Button>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
