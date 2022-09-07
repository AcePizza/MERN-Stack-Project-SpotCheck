import { Avatar, Button, getToolbarUtilityClass, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import useFetch from "../utils/useFetch";
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
    let something = date.toDateString(date);
    return something;
  };

  const whoIsTheLoggedInUser = () => {
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
    return user.sub;
  };

  // TODO: use array idex for mongoDB deletion
  console.log("first", props.index);

  return (
    <>
      {!findUser ? (
        <LoadingPleaseWait />
      ) : (
        <>
          <Grid key={props.index} container wrap="nowrap" spacing={2}>
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
                    <Button color="warning" style={{ textAlign: "right" }}>
                      Delete
                    </Button>
                  </>
                ) : (
                  <>
                    <Button disabled={true} style={{ textAlign: "right" }}>
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
