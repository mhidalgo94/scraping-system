import { useState, useEffect} from 'react';
import axios from 'axios';
import useAuth from "../../../utils/useAuth";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import AlarmIcon from '@mui/icons-material/Alarm';
import SearchSheduleComponentList from './addScheduledSearch';
import CircularProgress from "@mui/material/CircularProgress";
import { blue } from "@mui/material/colors";

import './searcharticles.css'
import useStyles from './style'


function SheduleSearch({setNotification}){
    const [company, setCompany] = useState('ebay');
    const allCompany = ['ebay','amazon'];
    const classes = useStyles();
    const {logoutUser} = useAuth();
    const [loadingData, setLoadingData] = useState(true);
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [dataComponent, setDataComponent] = useState([])
    const headers = {
        'Content-type':'application/json',
        'Authorization': "Bearer " + JSON.parse(localStorage.getItem("authTokens", null))?.access,
    }
    
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        setLoadingSearch(true);
        const form = new FormData(e.target);
        const body_ = Object.fromEntries(form);
        const url = `${process.env.REACT_APP_API_URL_BASE}/api/search-schedule/`;

        axios.post(url,body_,{headers}).then(res=>{
            const result = res.data.result;
            setDataComponent([...dataComponent,result]);
            setNotification(prev=>({...prev,open:true,text:'Task scheduled successfully.'}));
        }).catch(err => {
            if (err?.response.statusText==='Unauthorized'){
                logoutUser()
            }
            setNotification(prev=>({...prev,open:true,text:err.response.data.detail || err.message,severity:"error"}));
        }).finally(()=>{
            setLoadingSearch(false);
        })
        

    }
    const getData =()=>{
        setLoadingData(true);
        const url = `${process.env.REACT_APP_API_URL_BASE}/api/scheduled-task-list/`;
        axios.get(url,{headers}).then(res=>{
            setDataComponent(res.data?.result);
        }).catch(err=>{
            if (err?.response.statusText==='Unauthorized'){
                logoutUser()
            }
            setNotification(prev=>({...prev,open:true,text:err.response.data.detail || err.message,severity:"error"}));
        }).finally(()=>{
            setLoadingData(false);
        })
    }

    useEffect(()=>{
        getData();
        // eslint-disable-next-line
    },[]);

    return (
        <Container fixed style={{marginTop:'10px'}}>
            <Box component="form" sx={{m:1,padding:'2px 0 13px 0'}}  noValidate onSubmit={handleSubmit}>
                <div className="head-search">
                    <h4 className="title-search">Create scheduled search:</h4>
                </div>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1}}>
                        <Grid item xs={2}>
                            <TextField required fullWidth label="Title" name="search_title" size="small" />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField required fullWidth label="Description" name="description" size="small" />
                        </Grid>
                        <Grid item xs={1}>
                            <TextField required fullWidth label="Amount page" name="mount_page" type="number" defaultValue={1} inputProps={{ min:1, max:10 }}
                                size="small" 
                                />
                        </Grid>
                        <Grid item xs={2}>
                            <Select size="small" fullWidth value={company} label="Service company" name="company" onChange={(e)=>setCompany(e.target.value)} style={{minWidth:"60px"}}>
                                {allCompany.map((item,index)=>{
                                    return <MenuItem key={index} value={item}>{item}</MenuItem>
                                })}
                            </Select>
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                size="small"
                                type="datetime-local"
                                name="dateSearch" fullWidth
                                format="yyyy-MM-dd HH:mm"
                                required
                            />
                        </Grid>
                        <Grid item xs={2} style={{display:'flex'}}>
                            <Button disabled={loadingSearch} variant="contained" className={classes.btnCreate} type="submit" fullWidth startIcon={
                            !loadingSearch ? <AlarmIcon /> : (
                                <CircularProgress
                                size={24}
                                sx={{color: blue[500]}}
                                />
                            )
                            }
                            >Create</Button>
                        </Grid>
                </Grid>

            </Box>
            {!loadingData ?
                (Boolean(dataComponent.length) ? (
                    <div style={{margin: "8px",padding: "2px 0 13px 0"}}>
                        <div className="head-search">
                            <h4 className="title-search">Scheduled Taks:</h4>
                        </div>
                        {dataComponent.map((obj,index) => <SearchSheduleComponentList setNotification={setNotification} key={index} listData={obj} getData={getData} />)}
                    </div>
                ) : (
                    <div style={{margin: "8px",padding: "2px 0 13px 0"}}>
                        <h3 variant="h5" style={{margin:"20px auto",textAlign:"center",color:"rgb(133, 141, 150)"}}>No recent scheduled tasks.</h3>
                    </div>
                    ))
                : <span className={classes.LoadingData}><CircularProgress /></span>
                
            }
        </Container>
        
    )
}

export default SheduleSearch;