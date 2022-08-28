import {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import Container from '@mui/material/Container';
import CircularProgress from "@mui/material/CircularProgress";
import { blue } from "@mui/material/colors";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import useAuth from "../../../utils/useAuth";
import DialogConfirm from '../../dialog/dialogconfirm'

import './formprofile.css'

function FormUser({firstname, lastname, user_name,email, last_login, date_update,setUserData, loading,setNotification}){
    const {user,logoutUser} = useAuth()
    const navigate = useNavigate()
    // state for Dialog confirm
    const [openDialog, setOpenDialog] = useState(false)
    const [textDialog,setTextDialog] = useState({title:"",content:""})
    const [loadingAcept, setLoadingAcept] = useState(false)
    const handleChange = (e)=>{
        setUserData(prev=>({...prev,[e.target.name]:e.target.value}))
    }
    
    const onAcept = ()=>{
        setLoadingAcept(true);   

        const url = `${process.env.REACT_APP_API_URL_BASE}/api/user/${user_name}/destroy/`;
        const headers = {
            'Content-type':'application/json',
            'Authorization': "Bearer " + JSON.parse(localStorage.getItem("authTokens", null))?.access,
        }
        axios.delete(url,{headers}).then(res=>{
            navigate('/dashboart/user');
        }).catch(err => {
            console.log(err)
            if (err.response.statusText==='Unauthorized'){
                logoutUser()
              }
              setNotification(prev=>({...prev,open:true,text:err.response.data.detail || err.message,severity:"error"}))
        })
        setOpenDialog(false);
        setLoadingAcept(false);

    }

    const handleDeleteUser = ()=>{
        setTextDialog({...textDialog, text:"Confirm Delete!", content:`Are you sure you want to delete this user: '${firstname} ${lastname}'?`})
        setOpenDialog(true)
    }

    return (

        <Container maxWidth="sm" className="container-form" style={{height: "100%"}}>
            <Box autoComplete="off" sx={{paddingLeft:"0px",width: '70ch',maring:"0 8px"}}>
                <div style={{width:"100%",padding:"5px"}}>
                    <TextField type="text" onChange={handleChange} name="firstname" value={firstname} label="First Name" color="success"  fullWidth placeholder="Input first name." size="small"/>
                </div>
                <div style={{width:"100%",padding:"5px"}}>
                    <TextField type="text" onChange={handleChange} name="lastname" value={lastname} label="Last Name" color="success"  fullWidth placeholder="Input last name." size="small" />
                </div>
                <div style={{width:"100%",padding:"5px"}}>
                    <TextField type="text" onChange={handleChange} name="user_name" value={user_name} label="Username" color="success"  fullWidth placeholder="Input username." size="small" />
                </div>
                <div style={{width:"100%",padding:"5px"}}>
                    <TextField  label="Email" onChange={handleChange} name="email" value={email} type="email" color="success" fullWidth placeholder="Input your email." size="small"/>
                </div>
                <div style={{width:"100%",padding:"5px"}}>
                    <TextField  label="Password" onChange={handleChange} name="password" type="password" color="success" fullWidth placeholder="Input password. " size="small"/>
                </div>
            </Box>
            <div className="container-info-user">
                <div className="container-info-items">
                    <h4>Last Login</h4>
                    <p>{last_login}</p>
                </div>
                <div className="container-info-items">
                    <h4>Last Update</h4>
                    <p>{date_update}</p>
                </div>
            </div>
            <div className="container-footer-user">
                {user.mang && (
                    
                    <Button variant="contained" disabled={loading} id="btn-error" onClick={handleDeleteUser}>Delete
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
                )}
                <Button id="btn-success" disabled={loading} variant="contained" type="submit">Save Change
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
                <DialogConfirm
                    fullWidth={true}
                    maxWidth='sm'
                    open={openDialog}
                    setOpen={setOpenDialog}
                    onAcept={onAcept}
                    title={textDialog.title}
                    content={textDialog.content}
                    loadingAcept={loadingAcept}
                />
            </div>

      </Container>
        
    )
}


export default FormUser;