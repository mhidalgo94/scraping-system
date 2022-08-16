import React from "react";
import "./sidebarleft.css";
import ListItems from './ListItems'
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ScreenSearchDesktopOutlinedIcon from "@mui/icons-material/ScreenSearchDesktopOutlined";
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import useAuth from '../../../utils/useAuth'


function SideLeftBar() {
  const {user} = useAuth()

  
  return (
    <div className="sidebarleft">
      <div className="sidebarleft-container-profile">
        <div className="container-img-profile">
          <img
            className="img-profile-sidebar"
            src="https://images.pexels.com/photos/8159657/pexels-photo-8159657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="imagen-profile"
          />
        </div>
        <h2 className="sidebar-name-profile">{user?.user_name || 'unknown'}</h2>
      </div>
      <div className="sidebarleft-wrapper">
        <div className="sidebarleft-menu">
          <h4 className="sidebar-title">Dashboart</h4>
          <ul className="sidebar-list">
            <ListItems text='Home' to='/dashboart/home' icons={<HomeOutlinedIcon/>} />
            <ListItems text='Search' to='/dashboart/search' icons={<ScreenSearchDesktopOutlinedIcon/>} />
            <ListItems text='Search Log' to='/dashboart/search-log' icons={<SummarizeOutlinedIcon/>} />
            <ListItems text='Articles Search' to='/dashboart/search-articles' icons={<Inventory2OutlinedIcon/>} />
            <ListItems text='Logout' to='/logout' icons={<LogoutOutlinedIcon/>} />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SideLeftBar;
