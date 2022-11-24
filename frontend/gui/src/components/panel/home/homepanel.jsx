
import {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Box,Grid, Typography} from '@mui/material';
import ContentCardHome from './contentcardhome';
import GraficPieHome from './graficHome'
import FindInPageIcon from '@mui/icons-material/FindInPage';
import AlarmIcon from '@mui/icons-material/Alarm';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import DataGridTaskScheduled from './DataGridHome';
import NotificationSnackBars from '../../notification/Notification';
import CircularProgress from '@mui/material/CircularProgress';
import useStyles from './styles';
import useAuth from "../../../utils/useAuth";

function HomePanel(){
    const classes = useStyles();
    const {logoutUser,user} = useAuth();
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false);
    // State for component notification
    const [notification, setNotification] = useState({open:false,text:"",horizontal:"center"})
    const NotificationClose = (e) => {
        setNotification((prev)=>({...prev, open:false}));
    };
    const headers = {
        'Content-type':'application/json',
        'Authorization': "Bearer " + JSON.parse(localStorage.getItem("authTokens", null))?.access,
    }
    const getData =()=>{
        setLoading(true);
        const url = `${process.env.REACT_APP_API_URL_BASE}/api/list/search/all/`;
        axios.get(url,{headers}).then(res=>{
            setData(res.data?.results);
        }).catch(err=>{
            if (err?.response.statusText==='Unauthorized'){
                logoutUser()
            }
            setNotification(prev=>({...prev,open:true,text:err.response?.data?.detail || err.message,severity:"error"}));
        }).finally(()=>{
            setLoading(false);
        })
    }

    const getFullName = ()=>{
        const firstname = user.firstname[0].toUpperCase()  + user.firstname.slice(1);
        const lastname = user.lastname[0].toUpperCase()  + user.lastname.slice(1);
        return firstname + " " + lastname;
    }

    useEffect(()=>{
        
        getData()
        const interval = setInterval(()=>{
            getData();
          },60000)
          return ()=> clearInterval(interval);
        // eslint-disable-next-line
    },[])
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                {/* Card de bievenida */}
                <Grid item xs={6}>
                    <div className={classes.PaperTitle}>
                        <Typography variant='h4' className={classes.titleHome}>Welcome {getFullName()}</Typography>    
                        <div style={{width:'100%', marginTop:'10px',display:'grid'}}>
                            <Typography variant='subtitle1' className={classes.SubtitleHome}>Schedule your search before you forget it. Your email will remind you of the result.</Typography>
                            <div style={{display:'flex'}}>
                                <Link className={classes.LinkSearch} to='/dashboart/start-search'>Go Now</Link>
                                <Link className={classes.LinkResult} to='/dashboart/search'>Your Result</Link>
                            </div>
                        </div>
                    </div>
                </Grid>
                 {/* Card general number */}
                <Grid item xs={6}>
                    <Grid container spacing={1}>
                        <Grid item xs={4} >
                            <div className={classes.CardHome} >
                                <ContentCardHome text="SUCCESS" number={data.filter(val=>val.status_task==='SUCCESS').length} icon={<FindInPageIcon color="success" sx={{ fontSize: 90, opacity:0.9 }} />}  />
                            </div>
                        </Grid>
                        <Grid item xs={4} >
                            <div className={classes.CardHome} >
                                <ContentCardHome text="PENDING" number={data.filter(val=>val.status_task==='PENDING').length} icon={<AlarmIcon color="primary" sx={{ fontSize: 90, opacity:0.9 }} />} />
                            </div>
                        </Grid>
                        <Grid item xs={4} >
                            <div className={classes.CardHome} >
                                <ContentCardHome text="FAILURE" number={data.filter(val=>val.status_task === 'FAILURE').length}  icon={<ErrorOutlineIcon color="error" sx={{ fontSize: 90, opacity:0.9 }} />} />
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                {/* Tabble task scheduled */}
                <Grid item xs={8} style={{marginTop:'20px'}}>
                    <div className={classes.DataGridContainer}>
                        <Typography variant="h5" className={classes.TitleTable} >Recient Task Scheduled</Typography>
                        <DataGridTaskScheduled loading={loading} data={data}/> 
                    </div>
                </Grid>
                {/* Grafic about table task scheduled */}

                <Grid item xs={4} style={{marginTop:'20px'}}>
                    <div className={classes.GraficContainer}>                        
                        <Typography variant="h5" className={classes.TitleTable} >Search States</Typography>
                        {loading ? <div style={{width:'100%',display:'grid',justifyContent:'center'}}><CircularProgress /></div> 
                        : 
                        (<GraficPieHome allData={data} />)}
                    </div>
                </Grid>
            </Grid>
            <NotificationSnackBars {...notification} onClose={NotificationClose}  />

        </Box>
    )
}


export default HomePanel;