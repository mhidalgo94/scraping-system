import useStyles from './stylesMenu';
import {Divider,MenuItem , Menu } from '@mui/material';
import {Link} from 'react-router-dom';
import useAuth from '../../../utils/useAuth'



export default function SettingsMenu({user, anchorElSettings, setAnchorElSettings,openSettings}){
    const classes = useStyles()
    const {logoutUser} = useAuth()

    return (
        <Menu
        className={classes.Menu}
        anchorEl={anchorElSettings}
        open={openSettings}
        onClose={()=>setAnchorElSettings(null)}
        MenuListProps={{
        'aria-labelledby': 'basic-button',
        }}
        PaperProps={{
            style:{borderRadius:"12px", minWidth:"230px", paddingBottom:"0px"}
        }}
        >
        <div className={classes.HeaderMenu}>
            <div>
                <h3 stlye={{margin:0,fontWeight:600,lineHeight:1.5,fontFamily: "Public Sans sans-serif"}}>Settings</h3>
                <p style={{color: "rgb(99, 115, 129)",lineHeight: 1.57143,fontSize: "0.875rem"}}>{user?.user_id}</p>
            </div>
        </div>
        <Divider/>
        <MenuItem className={classes.MenuItemContainer}>
            <Link to="/" className={classes.MenuItemLink}>
                Home Page
            </Link>
        </MenuItem>
        <MenuItem  className={classes.MenuItemContainer}>
            <Link to={`/dashboart/user/${user.user_name}`} className={classes.MenuItemLink}>
                Profile
            </Link>
        </MenuItem>
        <Divider/>
        <MenuItem  className={classes.MenuItemContainer}>
            
            <span onClick={()=>logoutUser()}className={classes.MenuItemLink} style={{border:'none'}}>
                Logout
            </span>
        </MenuItem>
    </Menu>
    )
}