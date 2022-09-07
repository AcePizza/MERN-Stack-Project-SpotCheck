import React, { useContext, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoginDialog from "../components/LoginDialog";
import { AutenticationContext } from "../context/AutenticationContext";
import useFetch from "../utils/useFetch";

const theme = createTheme();

const SignIn = () => {
  const [formData, setFormData] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [resultsFromFetch, setResultsFromFetch] = useState(null);
  const { isUserLoggedIn } = useContext(AutenticationContext);

  const fromChildSetOpenDialog = () => {
    setOpenDialog();
  };

  const onChangeEventHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const { data, runFetchWithUrl } = useFetch(
    "http://localhost:5000/users/benjamin"
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    try {
      const fetchData = await fetch(
        "http://localhost:5000/users/login",
        requestOptions
      );
      const response = await fetchData.json();
      setResultsFromFetch({
        status: fetchData.status,
        response,
      });
      const token = response.token; //Store the token

      localStorage.setItem("token", token);
      setOpenDialog(true);
    } catch (error) {
      setResultsFromFetch({
        msg: "Sommething went wrong",
        error: "error",
      });
    }
  };

  return (
    <>
      {openDialog && (
        <LoginDialog
          resultsFromFetch={resultsFromFetch}
          openDialog={openDialog}
          fromChildSetOpenDialog={fromChildSetOpenDialog}
        />
      )}
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={onChangeEventHandler}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={onChangeEventHandler}
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default SignIn;
