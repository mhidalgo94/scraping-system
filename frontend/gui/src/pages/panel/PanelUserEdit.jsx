import {useEffect, useState} from 'react';
import PanelPage from "./PanelPage";
import { useParams } from 'react-router-dom';
import axios from 'axios'
import Grid from '@mui/material/Grid';
import CardProfile from '../../components/panel/profile/cardProfile';
import FormProfile from '../../components/panel/profile/formProfile';
import NotificationSnackBars from '../../components/notification/Notification'

import useAuth from "../../utils/useAuth";

function PanelUserEdit(){
    const {userId:userIdParams} = useParams()
    const {logoutUser} = useAuth()
    const [userId, setUserId] = useState(userIdParams)
    const [loadingContent, setLoadingContent] = useState(true)
    const [saveBtnLoading, setSaveBtnLoading] = useState(false)
    const [userData, setUserData] = useState({})
    // State for component notification
    const [notification, setNotification] = useState({open:false,text:"",horizontal:"center"})
    const NotificationClose = (e) => {
      setNotification((prev)=>({...prev, open:false}));
    };
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        setSaveBtnLoading(true)
        const FormDataSend = new FormData(e.target);
        const body= Object.fromEntries(FormDataSend);
        if(body.is_active){body.is_active = userData.is_active}  
        if(body.staff){body.staff = userData.staff}
        const headers = {
            'Authorization': "Bearer " + JSON.parse(localStorage.getItem("authTokens", null))?.access,
        }
        const url= `${process.env.REACT_APP_API_URL_BASE}/api/user/${userId}/update/`;
        axios.putForm(url,body,{headers}).then(res=>{
          setSaveBtnLoading(false)
          if (res.data.user_name !== userId){
            setUserId(res.data.user_name);
          }else{
            setUserData(res.data)
          }
          setNotification((prev)=>({...prev, open:true, text:"User update succefully.", severity:"success"}))
        }).catch(err=> {
          setSaveBtnLoading(false);
          if (err.response.statusText==='Unauthorized'){
            logoutUser()
          }
          setNotification((prev)=>({...prev, open:true, text:err.response.data.detail || err.message, severity:'error'}))

        });

    }
    

    useEffect(()=>{
        const url= `${process.env.REACT_APP_API_URL_BASE}/api/user/${userId}/retrieve/`;
        const headers = {
            'Content-type':'application/json',
            'Authorization': "Bearer " + JSON.parse(localStorage.getItem("authTokens", null))?.access,
        }
          
        axios.get(url,{headers}).then(function (res) {
          console.log(res);
          setUserData(res.data);
          setLoadingContent(false);
        }).catch(function (err) {
          if (err.response.statusText==='Unauthorized'){
            setLoadingContent(false);
            logoutUser()
          }
        });
    },[userId,logoutUser])

    

  return (
    <PanelPage loading={loadingContent} title={`Edit profile: ${userId.toString().toUpperCase()}`} >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} style={{padding:'10px', margin:"auto"}} >
              <Grid item xs={5}>
                  <CardProfile {...userData} setUserData={setUserData}/>
              </Grid>
              <Grid item xs={7}>
                  <FormProfile {...userData} setUserData={setUserData} loading={saveBtnLoading} setNotification={setNotification} />
              </Grid>
          </Grid>
        </form>
        <NotificationSnackBars {...notification} onClose={NotificationClose}  />
        
    </PanelPage>
  );
};

export default PanelUserEdit;