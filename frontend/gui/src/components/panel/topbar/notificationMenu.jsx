
import useStyles from "./stylesMenu";
import {Container, ListItemIcon, MenuItem, Tooltip, Typography } from "@mui/material";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

function NotificationsMenuItem({company,message,date,read,status}){
    const classes = useStyles();

    return (
        <MenuItem className={status==='success' ? classes.MenuItemSuccess : classes.MenuItemError}>
                <ListItemIcon>
                    { status==='success' ? (
                       <Tooltip title="Task complete successfully.">
                            <CheckCircleOutlineIcon  color='success'/>
                        </Tooltip>
                    ) :
                    (   <Tooltip title="Error in schedule task.">
                            <ErrorOutlineOutlinedIcon color='error' />
                        </Tooltip>
                    )
                    }
                </ListItemIcon>
                <Container className={classes.Container}>
                    <Typography variant="subtitle2" noWrap><strong>{company.toUpperCase()}</strong>{message}  </Typography>
                    <Typography variant="caption" noWrap><strong>Date:</strong>{date.toLocaleDateString()}</Typography>
                </Container>
            </MenuItem>
    )
}

export default NotificationsMenuItem;