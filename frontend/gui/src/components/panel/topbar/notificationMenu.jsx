
import useStyles from "./stylesMenu";
import {useNavigate} from 'react-router-dom'
import {Container, ListItemIcon, MenuItem, Tooltip, Typography } from "@mui/material";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import AccessAlarmsOutlinedIcon from '@mui/icons-material/AccessAlarmsOutlined';
import Chip from '@mui/material/Chip';


function NotificationsMenuItem({message,recieved_date,search,status,setNotificationSnack}){
    const classes = useStyles();
    const navigate = useNavigate();

    const classNam = (status_task)=>{
        if (status_task ==='SUCCESS'){
            return classes.MenuItemSuccess
        } else if(status_task ==='REVOKED'){
            return classes.MenuItemRevoked
                
        }else if(status_task ==='PENDING'){
            return classes.MenuItemPending
            }
        else{ return classes.MenuItemError}
    }

    const statusSearch = (status_task)=>{
        if (status_task==='SUCCESS'){
            return (
                <Tooltip title="Task complete successfully.">
                    <CheckCircleOutlineIcon  color='success'/>
                </Tooltip>
            )
        } else if(status_task==='REVOKED'){
            return (
                <Tooltip title="This task has been revoked.">
                    <ReportProblemOutlinedIcon color='secondary' />
                </Tooltip>)
        }else if(status_task==='PENDING'){
            return (
                <Tooltip title="This task is pending to date.">
                    <AccessAlarmsOutlinedIcon color='primary' />
                </Tooltip>)
            }else{
            return (  
                 <Tooltip title="Error in schedule task.">
                    <ErrorOutlineOutlinedIcon color='error' />
                </Tooltip>)
        }
    }

    
    const gotToSearch= () =>{
        if (search.delete===true){
            setNotificationSnack( prev=>({...prev,open:true,text:'This search has been removed.',severity:"warning"}));
            return false
        }
        navigate(`/dashboart/list-articles/${search.id}/${search.company}`)
    }

    return (
        <MenuItem className={classNam(status)}>
            <ListItemIcon>
                { statusSearch(status) }
            </ListItemIcon>
            <Container className={classes.Container}>
                <Typography variant="subtitle2" noWrap><strong>{search.company.toUpperCase()} </strong> {message}  </Typography>
                <div style={{display:"flex", alignItems:'center',justifyContent:'space-between'}}>
                    <Typography variant="caption" style={{fontSize:'0.8rem',fontWeight:'400'}} noWrap><strong>Date:</strong>{new Date(recieved_date).toUTCString().slice(4,-4)}</Typography>
                    <Chip onClick={gotToSearch} size="small"  label={status} variant="outlined" style={{fontSize:'0.8rem',fontWeight:'400'}} />
                </div>
            </Container>
        </MenuItem>
    )
}

export default NotificationsMenuItem;