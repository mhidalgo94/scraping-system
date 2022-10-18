import React, {useState} from 'react';
import {Button, Menu, MenuItem, Tooltip, MenuList, Divider, Typography, } from '@mui/material';
import {  NotificationsNone  } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import useAuth from '../../../utils/useAuth';
import NotificationsMenuItem from './notificationMenu';
import useStyles  from './stylesMenu';
import SettingsMenu from './settingsMenu';
import './topbar.css';

function TopBar() {
    let {user} = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);
    const openNotification = Boolean(anchorEl);
    
    const [anchorElSettings, setAnchorElSettings] =useState(null);
    const openSettings = Boolean(anchorElSettings);


    const classes = useStyles();

    // data with out fetch
    const data =[
        {
            id:1,
            company:"Amazon",
            message:"Existido error al ejecutar la tarea",
            date:new Date(),
            read:true,
            status:"error"
        },
        {
            id:5,
            company:"Ebay",
            message:"Tarea realizada correctamente",
            date:new Date(),
            read:true,
            status:"success"
        },
        {
            id:12,
            company:"Amazon",
            message:"Existido error al ejecutar la tarea",
            date:new Date(),
            read:true,
            status:"error"
        },
        {
            id:13,
            company:"Ebay",
            message:"Tarea realizada correctamente",
            date:new Date(),
            read:false,
            status:"success"
        },
        {
            id:14,
            company:"Ebay",
            message:"Existido error al ejecutar la tarea",
            date:new Date(),
            read:false,
            status:"error"
        },
    ]



    const noticacionesRead = data.filter(obj=> obj.read ===true)
    const noticacionesNoRead = data.filter(obj=> obj.read === false)
    
    
    const handleNotification =()=>{
        alert('Limpiando todas las tareas')
    }

  return (
    <div className='topbar'>
        <div className='topbarWrapper'>
            <div className='topLeft'>
                <span className="logo">Raspin</span>
            </div>
            <div className='topRight'>
                <div className='topbarIcons'>
                    <p>{user?.user_name || 'unknown'}</p>
                </div>
                <div className='topbarIcons'>
                    {/* Button menu for check read all notifiactions */}
                    <NotificationsNone  color={openNotification ? "success" : undefined} onClick={e=>setAnchorEl(e.currentTarget)} aria-controls={openNotification ? 'basic-menu' : undefined} />
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
                        <div className={classes.HeaderMenu}>
                            <div>
                                <h3 stlye={{margin:0,fontWeight:600,lineHeight:1.5,fontFamily: "Public Sans sans-serif"}}>Notifications</h3>
                                <p style={{color: "rgb(99, 115, 129)",lineHeight: 1.57143,fontSize: "0.875rem"}}>You have {noticacionesNoRead.length ? `${noticacionesNoRead.length} notifications new` : `notification new`} </p>
                            </div>
                            <IconButton color='success'>
                                <Tooltip title="Check all">
                                    <DoneAllOutlinedIcon onClick={handleNotification} />
                                </Tooltip>
                            </IconButton>
                        </div>
                        <Divider/>
                        <Typography ml={1} variant="overline" display="block" style={{fontWeight: 700,color:"rgb(99, 115, 129)"}} gutterBottom>NEW</Typography>
                        <MenuList style={{margin:'0px',padding:'0px'}}>
                            {noticacionesNoRead?.map((obj, index)=>{
                                return (
                                    <div key={index} style={!obj.read ? {background:'rgba(145, 158, 171, 0.12)'} : {}} >
                                        <NotificationsMenuItem  {...obj} />
                                    </div>

                                )
                            })}
                        </MenuList>
                        <Typography ml={1} variant="overline" display="block" style={{fontWeight: 700,color:"rgb(99, 115, 129)"}} gutterBottom>BEFORE THAT</Typography>
                        <MenuList style={{margin:'0px',padding:'0px'}}>
                            {noticacionesRead?.map((obj,index)=>{
                                return <NotificationsMenuItem key={index} {...obj}/>
                            })}
                        </MenuList>
                        <Divider />
                        <MenuItem style={{padding:0}}>
                            <Button onClick={()=>setAnchorEl(null)} variant="text" color="success" style={{width:"100%",lineHeight: "1.71429",fontSize:"0.875rem",textTransform:"capitalize"}}>Close</Button>
                        </MenuItem>
                    </Menu>
                </div>
                    {/* Meni settings.*/}
                <div className='topbarIcons'>
                    <SettingsOutlinedIcon color={openSettings ? "success" : undefined} onClick={e=>setAnchorElSettings(e.currentTarget)} /> 
                    <SettingsMenu user={user} openSettings={openSettings} anchorElSettings={anchorElSettings}  setAnchorElSettings={setAnchorElSettings}/>
                </div>
                <img src={user.image ? `${process.env.REACT_APP_API_URL_BASE}${user.image}` : '/images/default-image-avatar.jpg'} className='img-profile' alt="img-profile"/>
            </div>
        </div>
    </div>
  )
}

export default TopBar