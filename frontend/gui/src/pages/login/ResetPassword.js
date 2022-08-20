import {useState, useEffect} from 'react';
import {useNavigate, useParams, Link} from 'react-router-dom';
import axios from 'axios';
import CircularProgress from "@mui/material/CircularProgress";
import { blue } from "@mui/material/colors";
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from "@mui/material/Button";

import Notification from "../../components/notification/Notification";


function  InputPassword({value,setValue, label, name, size}){
    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = ()=>{
        setShowPassword(!showPassword)
    }

    return (
        <FormControl fullWidth variant="outlined" style={{marginTop:'15px'}}>
                <InputLabel  htmlFor={`outlined-adornment-${name}`} size={size}>{label}</InputLabel>
                <OutlinedInput
                label={label}
                size={size}
                id={`outlined-adornment-${name}`}
                name={name}
                type={showPassword ? 'text' : 'password'}
                value={value}
                onChange={(e)=> setValue(e.target.value)}
                endAdornment={
                    <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                    >
                        {showPassword ? <Visibility /> : <VisibilityOff  />}
                    </IconButton>
                    </InputAdornment>
                    }
                />
            </FormControl>
    )
}

function ResetPassword(){
    const {code} = useParams()
    const [password , setPassword] = useState('');
    const [password2 , setPassword2] = useState('');
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true)
    const navigate = useNavigate();
    const [notificacion, setNotificacion] = useState({open: false,text: "",});

    const NotificacionClose = (e) => {
        setNotificacion((prev)=>({...prev, open:false}));
    };

    const handleSubmit= (e)=>{
        e.preventDefault()
        setLoading(true);
        setDisabled(true)
        const body={password, password2, code}
        const endpoint = `api/user/change-password/`;
        const url = `${process.env.REACT_APP_API_URL_BASE}/${endpoint}`

        axios.post(url,body, {headers:{'content-type':'application/json'}}).then(res=>{
            setLoading(false);
            setDisabled(false);

            navigate('/login')
        }).catch(err=>{
            setLoading(false);
            setDisabled(false);

            const mensaje = err.response.data.detail;
            setNotificacion({...notificacion, open:true,text:mensaje, severity:'error'})
        })
    }
    useEffect(()=>{
        if(password.length > 0 && password === password2){
            setDisabled(false)
        }else{
            setDisabled(true)
        }
    },[password, password2])

    return (
        <div className="container-center">
            <div className="content">
            <div className="head-content">
                <h1>Recover password</h1>
                <p>Type password for reset.</p>
            </div>
            <div className="body-content">
                <form onSubmit={handleSubmit}>
                    <InputPassword label="Password" name="password" value={password} setValue={setPassword} fullWidth={true} size="small" />
                    <InputPassword label="Verify Password" name="password2" value={password2} setValue={setPassword2} size="small"/>
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
                <p style={{textAlign:"center", marginTop:'5px'}} >Back to <Link className='link' to='/forgot-password'>Resend Code</Link></p>
                </form>
            </div>

            
            <Notification {...notificacion} onClose={NotificacionClose} />

            </div>
        </div>
    )
}

export default ResetPassword;