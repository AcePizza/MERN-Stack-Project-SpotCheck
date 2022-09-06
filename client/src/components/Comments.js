import { Avatar, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import useFetch from "../utils/useFetch";
import LoadingPleaseWait from "../components/LoadingPleaseWait";

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
                {props.comments.time}
              </p>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}

export default Comments;
