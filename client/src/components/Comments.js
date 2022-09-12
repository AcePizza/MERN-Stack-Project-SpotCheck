import { Avatar, Button, getToolbarUtilityClass, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import LoadingPleaseWait from "../components/LoadingPleaseWait";
import jwtDecode from "jwt-decode";

function Comments(props) {
  const [data, setData] = useState();

  const generalFetch = async (url) => {
    try {
      const response = await fetch("http://localhost:5000/users/all");
      const results = await response.json();
      setData(results);
    } catch (error) {
      console.log("Great Error", error);
    }
  };

  useEffect(() => {
    generalFetch();
  }, []);

  const findUser =
    data &&
    data.allUsers.find((user) => {
      return user._id == props.comments.author;
    });

  const dateContructor = () => {
    let date = new Date(props.comments.date);
    let someDate = date.toDateString(date);
    return someDate;
  };

  const whoIsTheLoggedInUser = () => {
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
    return user.sub;
  };

  // TODO: use array idex for mongoDB deletion
  const deleteComment = async () => {
    //fetch options
    const options = () => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("index", props.index);
      urlencoded.append("spot", props.spot.id);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };
      return requestOptions;
    };

    try {
      const response = await fetch(
        "http://localhost:5000/spots/updatecomment",
        options()
      );
      const results = await response.json();
      props.setIsTheTaskDone(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (props.isTheTaskDone) {
      props.setIsTheTaskDone(false);
    }
  }, [props.isTheTaskDone]);

  return (
    <>
      {!findUser ? (
        <LoadingPleaseWait />
      ) : (
        <>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar
                alt={`${findUser.firstname} ${findUser.lastname}`}
                src={findUser.image}
              />
            </Grid>
            <Grid justifyContent="left" item xs zeroMinWidth>
              <h4
                style={{ margin: 0, textAlign: "left" }}
              >{`${findUser.firstname} ${findUser.lastname}`}</h4>
              <p style={{ textAlign: "left" }}>{props.comments.message} </p>
              <p style={{ textAlign: "left", color: "gray" }}>
                {dateContructor()}{" "}
                {whoIsTheLoggedInUser() == props.comments.author ? (
                  <>
                    <Button
                      onClick={deleteComment}
                      color="warning"
                      style={{ textAlign: "right" }}
                    >
                      Delete
                    </Button>
                  </>
                ) : (
                  <>
                    <Button style={{ textAlign: "right" }} disabled={true}>
                      Delete
                    </Button>
                  </>
                )}
              </p>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}

export default Comments;
