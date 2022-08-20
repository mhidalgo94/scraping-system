import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import CircularProgress from "@mui/material/CircularProgress";
import { blue } from "@mui/material/colors";
import Notification from "../../components/notification/Notification";


function ForgotPassword(){

    const [username , setUsername] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [notificacion, setNotificacion] = useState({open: false,mensaje: "",});

    const NotificacionClose = (e) => {
        setNotificacion((prev)=>({...prev, open:false}));
      };

    const handleSubmit = (e)=>{
        e.preventDefault();
        setLoading(true)
        const endpoint = 'api/user/verify-username/'
        const url = `${process.env.REACT_APP_API_URL_BASE}/${endpoint}`
        const body = {
            username,
        }
        axios.post(url, body,{headers:{"content-type":"application/json"}}).then(res=>{
            setLoading(false);
            navigate(`/verify-code-to-password/${username}`)

        }).catch(err=>{
            setLoading(false);
            setNotificacion({...notificacion, open:true, text:err.response.data.detail,severity:"error" })
        })
    }

    return (
        <div className="container-center">
            <div className="content">
            <div className="head-content">
                <h1>Recover password</h1>
                <p>Type your username.</p>
            </div>
            <div className="body-content">
                <Box component="form"  autoComplete="off" onSubmit={handleSubmit}>
                    <TextField value={username} onChange={(e) =>setUsername(e.target.value)} style={{margin: "5px"}} id="outlined-basic" focused label="Username" fullWidth={true} variant="outlined" size="small" />
                    <Button disabled={loading} type='submit' style={{margin: "5px",height:'40px'}} size="small" variant="contained" fullWidth>Verify
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
                    <p style={{textAlign:"center", marginTop:'5px'}} >Back to <Link className='link' to='/login'>Login</Link></p>

                </Box>
            </div>
            
            <Notification {...notificacion} onClose={NotificacionClose} />

            </div>
        </div>
    )
}


export default ForgotPassword;