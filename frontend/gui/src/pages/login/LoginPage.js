import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link as Lk } from "@mui/material/";
import Grid from "@mui/material/Grid";
import { blue } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Notification from "../../components/notification/Notification";

import useAuth from "../../utils/useAuth";

const theme = createTheme();

export default function LoginPage() {
  const { loginUser} = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboart/home";

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [notificacion, setNotificacion] = useState({open: false,mensaje: "",});


  const Resp = (res) =>{
      if ( res.status === 200){
        setLoading(false);
        setDisabled(false);
        
        navigate(from, { replace: true });

      }else if(res?.statusText === "Unauthorized"){
        setLoading(false);
        setDisabled(false);
        let text = "Wrong username and password. Sign up if you don't have an account"
        setNotificacion((prev)=>({open: true, text, severity: "error"}));
      } else{
        setLoading(false);
        setDisabled(false);
        let text =res?.statusText || "Please try again later or your connection"
        setNotificacion((prev)=>({open: true, text, severity: "error"}));
      }
      

  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setDisabled(true);
    setNotificacion((prev)=>({...prev,open:false}));
    // const data = new FormData(event.currentTarget);
    const user_name = event.target.user_name.value;
    const password = event.target.password.value;
    if (user_name && password) {
          const response = await loginUser(user_name, password);
          Resp(await response) 
      } else {
      setNotificacion((prev)=>({...prev, open:true,text:"Complete form data username and password.", severity:"warning"}));
      setLoading(false);
      setDisabled(false);
    }
  };

  const NotificacionClose = (e) => {
    setNotificacion((prev)=>({...prev, open:false}));
  };

  const toSigUp = (e) => {
    e.preventDefault();
    navigate("/sign-up");
  };

  return (
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
          <Typography component="h1" variant="h5">
            Sign In
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
              id="user_name"
              label="User Name"
              name="user_name"
              autoComplete="User Name"
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
              disabled={disabled}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
              {loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    color: blue[500],
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              )}
            </Button>
            <Notification {...notificacion} onClose={NotificacionClose} />
            <Grid container>
              <Grid item xs>
                <Lk href="#" variant="body2">
                  Forgot password?
                </Lk>
              </Grid>
              <Grid item>
                <Lk href="/sign-up" variant="body2" onClick={toSigUp}>
                  {"Don't have an account? Sign Up"}
                </Lk>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
