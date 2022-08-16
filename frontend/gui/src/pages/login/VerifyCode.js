import {useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import axios from 'axios'
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import CircularProgress from "@mui/material/CircularProgress";
import { blue } from "@mui/material/colors";
import './styles/verifycode.css';


function VerifyCode(){
    const {username} = useParams();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event)=>{
        event.preventDefault();
        setLoading(true)
        const url = `${process.env.REACT_APP_API_URL_BASE}/api/user/verify-code/`
        const formValue = new FormData(event.currentTarget);
        const body = {
            username,
            code:formValue.get('code')
        }
        axios.post(url,body,{headers:{"content-type":"application/json"}}).then(res=>{
            setLoading(false)
            if (res.status === 200){
                navigate('/login')
            }
        }).catch(err=>{
            setLoading(false)
            console.log(err)
        })
    }

    const handleResendCode= ()=>{
        setLoading(true)
        const url = `${process.env.REACT_APP_API_URL_BASE}/api/user/resend-code/`;
        const body = {username};
        axios.post(url,body,{headers:{"content-type":"application/json"}}).then(res=>{
            console.log(res)
            setLoading(false)
        }).catch(err=>{
            console.log(err)
            setLoading(false)

        })
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
                    <TextField name="code" style={{margin: "5px"}} id="outlined-basic" focused placeholder="Example:116da58a78624ab8b69fa53ed5ee5f5c" label="Code Verification" fullWidth={true} variant="outlined" size="small" />
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
                    <p style={{textAlign:"center"}} >Don’t have a code?  <span className='resend-code' onClick={handleResendCode}>Resend code</span></p>
                </Box>
            </div>
            </div>
        </div>
        
    )
}

export default VerifyCode;