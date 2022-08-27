import {useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import CircularProgress from "@mui/material/CircularProgress";
import { blue } from "@mui/material/colors";

import Notification from "../../components/notification/Notification";
import DialogConfirm from '../../components/dialog/dialogconfirm'

import './styles/verifycode.css';


function VerifyCodeToPassword(){
    const {username} = useParams();
    const navigate = useNavigate()
    const [valueCode ,setValueCode] = useState('')
    const [loading, setLoading] = useState(false);
    const [notificacion, setNotificacion] = useState({open: false,mensaje: "",});
    // state for Dialog confirm
    const [openDialog, setOpenDialog] = useState(false)
    const [textDialog,setTextDialog] = useState({title:"",content:""})


    const NotificacionClose = (e) => {
        setNotificacion((prev)=>({...prev, open:false}));
    };
    
    const handleSubmit = (event)=>{
        event.preventDefault();
        setLoading(true)
        const endpoint = 'api/user/verify-code/'
        const url = `${process.env.REACT_APP_API_URL_BASE}/${endpoint}`
        const body = {
            username,
            code:valueCode
        }
        axios.post(url,body,{headers:{"content-type":"application/json"}}).then(res=>{
            setLoading(false);
            const code = res.data.code;
            if (res.status === 200){
                navigate(`/password-reset/${code}`)
            }
        }).catch(err=>{
            setLoading(false)
            const mensaje = err.response.data.detail;
            setNotificacion({...notificacion, text:mensaje, open:true,severity:"error"})
        })
    }
    
    const onAcept = ()=>{
        setLoading(true)
        const url = `${process.env.REACT_APP_API_URL_BASE}/api/user/resend-code/`;
        const body = {username};
        axios.post(url,body,{headers:{"content-type":"application/json"}}).then(res=>{
            setLoading(false);
            setOpenDialog(false);
            const mensaje = res.data.detail;
            setNotificacion({...notificacion, text:mensaje, open:true,severity:"success"});
            setValueCode('');
        }).catch(err=>{
            setLoading(false);
            const mensaje = err.response.data.detail;
            setNotificacion({...notificacion, text:mensaje, open:true,severity:"error"});
            setValueCode('');

        })
    }

    const handleResendCode= ()=>{
        setOpenDialog(true);
        setTextDialog({...textDialog,title:"New code verification.",content:"You want a new verification code?"});
    }

    return (
        <div className="container-center">
            <div className="content">
            <div className="head-content">
                <h1>Please check your email!</h1>
                <p>We have emailed confirmation code, please enter the code in below box to verify your email.</p>
            </div>
            <div className="body-content">
                <Box component="form"  autoComplete="off" onSubmit={handleSubmit}>
                    <TextField value={valueCode} onChange={(e) =>setValueCode(e.target.value)} style={{margin: "5px"}} id="outlined-basic" focused placeholder="Ex: 116da58a78624ab8b69fa53ed5ee5f5c" label="Code Verification" fullWidth={true} variant="outlined" size="small" />
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
                    <p style={{textAlign:"center", marginTop:'5px'}} >Don’t have a code?  <span className='resend-code' onClick={handleResendCode}>Resend code</span></p>
                </Box>
            </div>
            <DialogConfirm
                fullWidth={true}
                maxWidth='sm'
                open={openDialog}
                setOpen={setOpenDialog}
                loading={loading}
                onAcept={onAcept}
                title={textDialog.title}
                content={textDialog.content}
                loadingAcept={loading}
              />
            <Notification {...notificacion} onClose={NotificacionClose} />

            </div>
        </div>
        
    )
}

export default VerifyCodeToPassword;