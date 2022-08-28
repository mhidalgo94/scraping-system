import React from "react";
import "./sidebarleft.css";
import ListItems from './ListItems'
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ScreenSearchDesktopOutlinedIcon from "@mui/icons-material/ScreenSearchDesktopOutlined";
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import useAuth from '../../../utils/useAuth'


function SideLeftBar() {
  const {user} = useAuth();

  
  return (
    <div className="sidebarleft">
      <div className="sidebarleft-container-profile">
        <div className="container-img-profile">
          <img
            className="img-profile-sidebar"
            src={user.image ? `${process.env.REACT_APP_API_URL_BASE}${user.image}` : '/images/default-image-avatar.jpg'}
            alt="imagen-profile"
          />
        </div>
        <div>
          <h2 className="sidebar-fullname-profile">{`${user.firstname} ${user.lastname}`}</h2>
          <p className="sidebar-staff-profile">{user.mang ? 'admin' : 'client'}</p>
        </div>
      </div>
      <div className="sidebarleft-wrapper">
        <div className="sidebarleft-menu">
          <h4 className="sidebar-title">Dashboart</h4>
          <ul className="sidebar-list">
            <ListItems text='Home' to='/dashboart/home' icons={<HomeOutlinedIcon/>} />
            <ListItems text='Search' to='/dashboart/search' icons={<ScreenSearchDesktopOutlinedIcon/>} />
            <ListItems text='Search Log' to='/dashboart/search-log' icons={<SummarizeOutlinedIcon/>} />
            <ListItems text='Articles Search' to='/dashboart/search-articles' icons={<Inventory2OutlinedIcon/>} />
            {user.mang && (
              <ListItems text='Users' to='/dashboart/user' icons={<PeopleAltOutlinedIcon />} />

            )}
            <ListItems text='Logout' to='/logout' icons={<LogoutOutlinedIcon/>} />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SideLeftBar;
