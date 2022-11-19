import {useState} from 'react';
import axios from 'axios';
import {Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import CircularProgress from '@mui/material/CircularProgress';

import useStyles  from './stylesMenu';

function CheckNotificationComp({notificationData,setNotificationData,headers,logoutUser,setNotificationSnack}){
    const filterReadNotification = notificationData.filter(val=> val.read === false);
    const classes =  useStyles();
    const [loadingCheck, setLoadingCheck] = useState(false);

    const handleNotification =()=>{
        setLoadingCheck(true)
        const endpoint = 'api/user/notification/all-checked/'
        const url = `${process.env.REACT_APP_API_URL_BASE}/${endpoint}`;
        axios.get(url, {headers}).then(res=>{
            setNotificationData(res?.data.results)
        }).catch(err=>{
            if (err.response.statusText==='Unauthorized'){
                logoutUser();
              }
            setNotificationSnack( prev=>({...prev,open:true,text:err.message,severity:"error"}));
        }).finally(()=>{
            setLoadingCheck(false);
        })
    }

    return (
        <div className={classes.HeaderMenu}>
            <div>
                <h3 stlye={{margin:0,fontWeight:600,lineHeight:1.5,fontFamily: "Public Sans sans-serif"}}>Notifications</h3>
                <p style={{color: "rgb(99, 115, 129)",lineHeight: 1.57143,fontSize: "0.875rem"}}>
                    You have {notificationData.length} {notificationData.length>1 ? ` notifications`:`notification`} . 
                    {filterReadNotification.length>1 ? `${filterReadNotification.length} notifications new`:` ${filterReadNotification.length} notification new`} 
                </p>
            </div>
            {Boolean(filterReadNotification.length) && (<IconButton color='success'>
                <Tooltip title="Check all">
                    {loadingCheck ? <CircularProgress size={15} /> : <DoneAllOutlinedIcon onClick={handleNotification} />}
                </Tooltip>
            </IconButton>)}
        </div>
    )
}

export default CheckNotificationComp;