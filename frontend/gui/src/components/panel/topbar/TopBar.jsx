import React from 'react';
import {  NotificationsNone  } from '@mui/icons-material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import useAuth from '../../../utils/useAuth'

import './topbar.css';


function TopBar() {
    let {user} = useAuth();
  return (
    <div className='topbar'>
        <div className='topbarWrapper'>
            <div className='topLeft'>
                <span className="logo">LOGOTIPO</span>
                
            </div>
            <div className='topRight'>
            <div className='topbarIcons'>
                    <p>{user?.user_name || 'unknown'}</p>
                </div>
                <div className='topbarIcons'>
                    <NotificationsNone/>
                </div>
                <div className='topbarIcons'>
                    <SettingsOutlinedIcon/>
                </div>
                <img src={user.image ? `${process.env.REACT_APP_API_URL_BASE}${user.image}` : '/images/default-image-avatar.jpg'} className='img-profile' alt="img-profile"/>
            </div>
        </div>

    </div>
  )
}

export default TopBar