import React, { useCallback, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextareaAutosize, TextField } from "@mui/material";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function MakeComment({ openDialog, currentSpot }) {
  const [open, setOpen] = React.useState(openDialog);
  const [commentText, setCommentText] = useState({});
  const [okUpload, setOkUpload] = useState(false);
  const redirectTo = useNavigate();

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

  const updateCommentOptions = useCallback(() => {
    const myHeaders = new Headers({
      "Content-Type": "application/x-www-form-urlencoded",
    });
    const urlencoded = new URLSearchParams({
      spot: currentSpot.id,
      user: getCurrentUser(),
      time: Date.now(),
      comment: JSON.stringify(commentText.comment),
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };
    return requestOptions;
  }, [commentText.comment, currentSpot.id]);

  const commentButtonHandler = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/spots/update",
        updateCommentOptions()
      );
      const results = await response.json();
      setOpen(false);
      redirectTo(`/spotdetails/${currentSpot.id}`);
    } catch (error) {
      console.log("error", error);
    }
  };

  console.log("okUpload", okUpload);

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
