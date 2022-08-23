import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LoginDialog from "../components/LoginDialog";

const theme = createTheme();

const SignIn = () => {
  const [formData, setFormData] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [resultsFromFetch, setResultsFromFetch] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setFormData({
      emailaddress: data.get("email"),
      password: data.get("password"),
    });

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    // Please move this to the hook
    const fetchStuffFromBackend = async () => {
      try {
        const fetchData = await fetch(
          "http://localhost:5000/users/login",
          requestOptions
        );
        const respose = await fetchData.json();
        setResultsFromFetch(respose);
        const token = resultsFromFetch.token;
        localStorage.setItem("token", token);
        if (resultsFromFetch.msg === "Success") {
          setOpenDialog(true);
        } else {
          console.log("Something went wrong");
        }
      } catch (error) {
        setResultsFromFetch({
          msg: "Sommething went wrong",
          error: "error",
        });
      }
    };

    fetchStuffFromBackend(formData);
  };

  return (
    <>
      {openDialog && (
        <LoginDialog
          resultsFromFetch={resultsFromFetch}
          openDialog={openDialog}
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
