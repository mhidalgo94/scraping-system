import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { blue } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import Notification from "../../components/notification/Notification";

import useAuth from "../../utils/useAuth";
import './styles/loginpage.css'


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

  return (
      <Container maxWidth="xs" sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent:"center",
        minHeight:"100vh",

      }} >
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent:"center"
        }}>
          <Typography component="h4" variant="h5">
            <h4 style={{textAlign:'center'}}>Sign In</h4>
            <p style={{fontSize:"1rem"}}>Enter your details below.</p>
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              size="small"
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
              size="small"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button className="btn-submit"
              type="submit"
              fullWidth
              size="small"
              disabled={disabled}
              variant="contained"
              sx={{ mt: 1, mb: 2 }}
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
            <Grid container>
              <Grid item xs>
              <Link className='link-sign' to="/reset-password">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
              <Link className='link-sign' to="/sign-up">
                  Don't have an account? Sign Up
              </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Notification {...notificacion} onClose={NotificacionClose} />
      </Container>
  );
}
