import {useState} from 'react';
import SearchArticle from './formSearch';
import SheduleSearch from './formSearchShedule';
import Divider from '@mui/material/Divider';
import NotificationSnackBars from '../../notification/Notification'


function SearchContainer(){

    // State for component notification
    const [notification, setNotification] = useState({open:false,text:"",horizontal:"center"})
    const NotificationClose = (e) => {
        setNotification((prev)=>({...prev, open:false}));
    };

    return (
        <>
            <SearchArticle setNotification={setNotification} />
            <Divider style={{margin:'22px 25px'}}/>
            <SheduleSearch setNotification={setNotification} />
            <NotificationSnackBars {...notification} onClose={NotificationClose}  />
        </>


    )
}

export default SearchContainer;