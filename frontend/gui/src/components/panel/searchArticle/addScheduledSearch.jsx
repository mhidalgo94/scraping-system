import { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import CircularProgress from "@mui/material/CircularProgress";
import { blue } from "@mui/material/colors";
import useAuth from "../../../utils/useAuth";
import useStyles from './style'


function StatusTask({statusTask}){
    if (statusTask === "SUCCESS"){
        return ( 
        <Chip size="small"  label={statusTask} style={{backgroundColor:'rgba(84, 214, 44, 0.16)',color:'rgb(34, 154, 22)', fontSize:'0.9rem',fontWeight:'600'}} />
        )
    }else if(statusTask === "PENDING"){
        return (
        <Chip size="small" label={statusTask} style={{backgroundColor:'rgba(255, 193, 7, 0.16)',color:'rgb(183, 129, 3)', fontSize:'0.9rem',fontWeight:'600'}} />
        )
    }else if(statusTask === "FAILURE"){
        return (
        <Chip size="small" label={statusTask} color="error" style={{backgroundColor:'rgba(255, 72, 66, 0.16)',color:'rgb(183, 33, 54)', fontSize:'0.9rem',fontWeight:'600'}} />
        )
    }
      
  }


  function SearchSheduleComponentList({listData,getData,setNotification}){
    const className = useStyles();
    const {logoutUser} = useAuth();
    const [dataState, setDataState] = useState(listData);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const allCompany = ['ebay','amazon'];
    
    const handleRevoketask = (e)=>{
        setLoadingDelete(true);
        const data= {id:e.target.value};
        const url = `${process.env.REACT_APP_API_URL_BASE}/api/revoke-task/`;
        const headers = {
            'Content-type':'application/json',
            'Authorization': "Bearer " + JSON.parse(localStorage.getItem("authTokens", null))?.access,
        }
        axios.delete(url,{headers,data}).then(res=>{
            getData();
            setNotification(prev=>({...prev,open:true,text:'Task has been successfully deleted.'}));
        }).catch(err=>{
            if (err?.response.statusText==='Unauthorized'){
                logoutUser()
            }
            setNotification(prev=>({...prev,open:true,text:err.response.data.detail || err.message,severity:"error"}));
        }).finally(()=>{
            setLoadingDelete(false);
        })
    }

    return (
        <Container fixed style={{m:0, padding:0}}>
            <Box component="form" sx={{padding:'2px 0 13px 0'}} noValidate>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1}}>
                    <Grid item xs={2}>
                        <TextField required value={dataState.search_title} fullWidth label="Title" name="search_title" size="small" />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField required value={dataState.description} fullWidth label="Description" name="description" size="small" />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField required value={dataState.page} disabled fullWidth label="Amount page" name="mount_page" type="number" defaultValue={1} inputProps={{ min:1, max:10 }}
                            size="small" 
                            />
                    </Grid>
                    <Grid item xs={2}>
                        <Select size="small" disabled fullWidth value={dataState.company} label="Service company" name="company" onChange={(e)=>setDataState(({...dataState,company:e.target.value}))} style={{minWidth:"60px"}}>
                            {allCompany.map((item,index)=>{
                                return <MenuItem key={index} value={item}>{item}</MenuItem>
                            })}
                        </Select>
                    </Grid>
                    <Grid item xs={3}>
                    <TextField
                            disabled
                            size="small"
                            type="datetime-local"
                            value={dataState.dateSearch}
                            name="dateSearch" fullWidth
                        />
                    </Grid>
                    <Grid item xs={1} style={{display:'flex'}}>
                        <Button value={dataState.task_id} className={className.btnDelete} disabled={loadingDelete} variant="contained" color="error" size='small' onClick={(e)=>handleRevoketask(e)} fullWidth startIcon={!loadingDelete ? <DeleteForeverOutlinedIcon /> : <CircularProgress size={18} sx={{color: blue[500]}}/>}>Remove</Button>
                    </Grid>
                </Grid>
                <div style={{display:'flex',alignItems:'center', justifyContent:'space-between'}}>
                    {/* Aqui va el estado de la tarea */}
                    <span style={{fontWeight:700,lineHeight:1.71429,color:"rgb(133, 141, 150)"}}>Status: <StatusTask statusTask={dataState.status_task} /> </span>  
                </div>
            </Box>
        </Container>
    )
}

export default SearchSheduleComponentList;