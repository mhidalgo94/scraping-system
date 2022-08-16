import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import {TextInput,PasswordInput} from './inputSingUp';
import Notification from "../../components/notification/Notification";
import {Link} from 'react-router-dom';
import Button from '@mui/material/Button';
import CircularProgress from "@mui/material/CircularProgress";
import CssBaseline from '@mui/material/CssBaseline';
import { blue } from "@mui/material/colors";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './styles/sign.css'


const theme = createTheme();


function SignUp() {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState({campo:'', valid:null})
  const [lastName, setLastName] = useState({campo:'', valid:null})
  const [userName, setUserName] = useState({campo:'', valid:null})
  const [email, setEmail] = useState({campo:'', valid:null})
  const [password, setPassword] = useState({campo:'', valid:false})
  const [loading, setLoading] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);

    // state notification
  const [notificacion, setNotificacion] = useState({open: false,mensaje: "",});

  const NotificacionClose = () =>{
    setNotificacion({...notificacion,open:false})
  }


  const expresiones = {
    name: /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/gim,
		userName: /^[a-zA-Z0-9]+$/,
		email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	}

  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      firstname: data.get('firstName'),
      lastname: data.get('lastName'),
      user_name: data.get('user_name'),
      email: data.get('email'),
      password: data.get('password'),
    };
    setLoading(true);
    setBtnDisabled(false);
    const endpoint = `api/user/sign-up/`;
    const url = `${process.env.REACT_APP_API_URL_BASE}/${endpoint}`;
    axios.post(url,JSON.stringify(body),{headers:{"content-type":"application/json"}}).then(res=> {
      setLoading(false);
      console.log(res)
      const {user_name} = res.data.user;
      navigate(`/sign-up/verify-code/${user_name}`);

    }).catch(err=>{
      console.log(err)
      let text = String(Object.values(err.response.data.detail)).replace(",", " - ") || err.response.data.detail
      setLoading(false);
      setNotificacion({...notificacion, open:true, text,color:'error'})
    })
  };

  useEffect(()=>{
    if(firstName.valid && lastName.valid && userName.valid && email.valid && password.valid){
      setBtnDisabled(false)
    }else{
      setBtnDisabled(true)
    }
  },[lastName, email, password, firstName, userName])

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={(e) =>handleSubmit(e)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
              <TextInput 
                  value={firstName}
                  setValue={setFirstName}
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  name="firstName"
                  autoComplete="name"
                  expresionesRegulares={expresiones.name}
                  disabled={loading}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextInput
                  value={lastName}
                  setValue={setLastName}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  expresionesRegulares={expresiones.name}
                  autoComplete="family-name"
                  disabled={loading}
                  size="small"
                  />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  value={userName}
                  setValue={setUserName}
                  required
                  fullWidth
                  id="username"
                  label="User Name"
                  name="user_name"
                  expresionesRegulares={expresiones.userName}
                  disabled={loading}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  value={email}
                  setValue={setEmail}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  expresionesRegulares={expresiones.email}
                  disabled={loading}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <PasswordInput estado={password} setEstado={setPassword} name='password' disabled={loading} size="small"/>
              </Grid>
              
            </Grid>
            <Button
            className="btn-submit"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={btnDisabled}
            >
              Sign Up
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
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link className='link-sign' to="/login">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Notification {...notificacion} onClose={NotificacionClose} />
      </Container>
    </ThemeProvider>
  );
}

export default SignUp;