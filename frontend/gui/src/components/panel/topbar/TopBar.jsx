import React, {useState, useEffect} from 'react';
import axios from 'axios';
// Component Material
// import  from '@mui/material/Badge';
import {Button, Menu, MenuItem, MenuList, Divider,Badge} from '@mui/material';
// Icons Material
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import {  NotificationsNone} from '@mui/icons-material';
// Utils
import useAuth from '../../../utils/useAuth';
import NotificationsMenuItem from './notificationMenu';
import useStyles  from './stylesMenu';
import SettingsMenu from './settingsMenu';
import NotificationSnackBars from '../../notification/Notification';
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
    // State Btn 'More'
    const [urlBtnMore ,setUrlBtnMore] = useState(null);
    const [loadingBtnMore ,setLoadingBtnMore] = useState(false);

    const getMore = ()=>{
        setLoadingBtnMore(true);
        axios.get(urlBtnMore, {headers}).then(res=>{
            const result = res?.data.results;
            setNotificationData([...notificationData, ...result]);
            setUrlBtnMore(res.data.next);
        }).catch(err=>{
            if (err.response.statusText==='Unauthorized'){
                logoutUser();
              }
            setNotificationSnack( prev=>({...prev,open:true,text:err.message,severity:"error"}));
        }).finally(()=>{
            setLoadingBtnMore(false);
        })
    }


    // State for component notification
    const [notificationSnack, setNotificationSnack] = useState({open:false,text:"",horizontal:"center"})
    const NotificationSnackClose = (e) => {
        setNotificationSnack((prev)=>({...prev, open:false}));
    };


    const getNotification = ()=>{
        setAnchorEl(null);
        setLoadingNotifications(true);
        const endpoint = 'api/user/notification/list/';
        const url = `${process.env.REACT_APP_API_URL_BASE}/${endpoint}`;
        axios.get(url, {headers}).then(res=>{
            setNotificationData(res?.data.results);
            setUrlBtnMore(res.data.next);
        }).catch(err=>{
            if (err.response.statusText==='Unauthorized'){
                logoutUser();
              }
            setNotificationSnack( prev=>({...prev,open:true,text:err.message,severity:"error"}));
            // setLoading(false);
        }).finally(()=>{
            setLoadingNotifications(false)
        })

    }

    useEffect(()=>{
        getNotification()
        const interval = setInterval(()=>{
            getNotification();
          },30000)
          return ()=> clearInterval(interval);
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
                        <Badge badgeContent={notificationData.filter(v=> v.read===false).length} color="primary">
                            <NotificationsNone  color={openNotification ? "success" : undefined} onClick={e=>setAnchorEl(e.currentTarget)} aria-controls={openNotification ? 'basic-menu' : undefined} />
                        </Badge>
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
                            style:{borderRadius:"12px", maxHeight:"500px"}
                        }}
                        >
                            {/* Btn for checked all notifications   */}
                        <CheckNotificationComp logoutUser={logoutUser} setNotificationSnack={setNotificationSnack} notificationData={notificationData} setNotificationData={setNotificationData}  headers={headers} />
                        <Divider/>
                        <MenuList style={{margin:'0px',padding:'0px'}}>
                            {notificationData?.map((obj, index)=>{
                                return (
                                    <div key={index} style={!obj.read ? {background:'rgba(145, 158, 171, 0.12)'} : {}} >
                                        <NotificationsMenuItem  {...obj} setNotificationSnack={setNotificationSnack} />
                                    </div>
                                )
                            })}
                        </MenuList>
                        <Divider />
                        <MenuItem style={{padding:0}}>
                            <Button disabled={Boolean(!urlBtnMore)} onClick={getMore} variant="text" color="success" style={{width:"100%",lineHeight: "1.71429",fontSize:"0.875rem",textTransform:"capitalize"}}>
                                {loadingBtnMore ? <CircularProgress size={16}/> : "More"}
                                </Button>
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