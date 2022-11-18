import React, {useState, useEffect} from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import NotificationSnackBars from '../../notification/Notification';
import {Button, Menu, MenuItem, MenuList, Divider} from '@mui/material';
import {  NotificationsNone  } from '@mui/icons-material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import useAuth from '../../../utils/useAuth';
import NotificationsMenuItem from './notificationMenu';
import useStyles  from './stylesMenu';
import SettingsMenu from './settingsMenu';
import CheckNotificationComp from './checkNotificationComp';
import './topbar.css';

function TopBar() {
    let {user,logoutUser} = useAuth();
    const classes = useStyles();
    const [notificationData, setNotificationData] = useState([]);
    const [loadingNotifications, setLoadingNotifications] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const openNotification = Boolean(anchorEl);
    const [anchorElSettings, setAnchorElSettings] =useState(null);
    const openSettings = Boolean(anchorElSettings);
    
    const token = JSON.parse(localStorage.getItem("authTokens", null));
    const headers = {
        Authorization: "Bearer " + token?.access,
    }
    // State for component notification
    const [notificationSnack, setNotificationSnack] = useState({open:false,text:"",horizontal:"center"})
    const NotificationSnackClose = (e) => {
        setNotificationSnack((prev)=>({...prev, open:false}));
    };


    const getNotification = ()=>{
        setLoadingNotifications(true);
        const endpoint = 'api/user/notification/list/';
        const url = `${process.env.REACT_APP_API_URL_BASE}/${endpoint}`;
        axios.get(url, {headers}).then(res=>{
            setNotificationData(res?.data.results);
        }).catch(err=>{
            if (err.response.statusText==='Unauthorized'){
                logoutUser();
              }
            setNotificationSnack( prev=>({...prev,open:true,text:err.message,severity:"error"}));
            // setLoading(false);
        }).finally(()=>{
            setLoadingNotifications(false);
        })

    }

    useEffect(()=>{
        const timer = setTimeout(()=>getNotification(), 1000);
        return () => clearTimeout(timer);
        // eslint-disable-next-line
    },[]);

  return (
    <div className='topbar'>
        <div className='topbarWrapper'>
            <div className='topLeft'>
                <span className="logo">E-<span>Scratch</span></span>
            </div>
            <div className='topRight'>
                <div className='topbarIcons'>
                    <p>{user?.user_name || 'unknown'}</p>
                </div>
                <div className='topbarIcons'>
                    {/* Button menu for check read all notifiactions */}
                    {loadingNotifications ? (
                        <CircularProgress size={16}/>
                    ) : (
                        <NotificationsNone  color={openNotification ? "success" : undefined} onClick={e=>setAnchorEl(e.currentTarget)} aria-controls={openNotification ? 'basic-menu' : undefined} />
                    )}
                    {/* This Menu show list all notifications */}
                    <Menu
                        className={classes.Menu}
                        anchorEl={anchorEl}
                        open={openNotification}
                        onClose={e=> setAnchorEl(null)}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                        PaperProps={{
                            style:{borderRadius:"12px"}
                        }}
                        >
                            {/* Btn for checked all notifications   */}
                        <CheckNotificationComp logoutUser={logoutUser} setNotificationSnack={setNotificationSnack} notificationData={notificationData} setNotificationData={setNotificationData}  headers={headers} />
                        <Divider/>
                        <MenuList style={{margin:'0px',padding:'0px'}}>
                            {notificationData?.map((obj, index)=>{
                                return (
                                    <div key={index} style={!obj.read ? {background:'rgba(145, 158, 171, 0.12)'} : {}} >
                                        <NotificationsMenuItem  {...obj} setNotificationSnack={setNotificationSnack}/>
                                    </div>
                                )
                            })}
                        </MenuList>
                        <Divider />
                        <MenuItem style={{padding:0}}>
                            <Button onClick={()=>setAnchorEl(null)} variant="text" color="success" style={{width:"100%",lineHeight: "1.71429",fontSize:"0.875rem",textTransform:"capitalize"}}>Close</Button>
                        </MenuItem>
                    </Menu>
                </div>
                    {/* Menu settings.*/}
                <div className='topbarIcons'>
                    <SettingsOutlinedIcon color={openSettings ? "success" : undefined} onClick={e=>setAnchorElSettings(e.currentTarget)} /> 
                    <SettingsMenu user={user} openSettings={openSettings} anchorElSettings={anchorElSettings}  setAnchorElSettings={setAnchorElSettings}/>
                </div>
                <img src={user.image ? `${process.env.REACT_APP_API_URL_BASE}${user.image}` : '/images/default-image-avatar.jpg'} className='img-profile' alt="img-profile"/>
            </div>
        </div>
        <NotificationSnackBars {...notificationSnack} onClose={NotificationSnackClose}  />

    </div>

  )
}

export default TopBar