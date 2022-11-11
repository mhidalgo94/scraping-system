import { useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import useAuth from "../../../utils/useAuth";
import { blue } from "@mui/material/colors";
import {Box, Button,Container,Grid,TextField, Select,MenuItem } from '@mui/material';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import NotStartedOutlinedIcon from '@mui/icons-material/NotStartedOutlined';
import CircularProgress from "@mui/material/CircularProgress";
import useStyles from './style';
import './searcharticles.css'

function SearchArticle({setNotification}){
    const classes = useStyles()
    // const navigate = useNavigate()
    const [company, setCompany] = useState('ebay')
    const {logoutUser} = useAuth()
    const allCompany = ['ebay','amazon']
    const [recentSearch, setRecentSearch] = useState([])
    const [loadingSearch, setLoadingSearch] = useState(false)
    const handleSubmit = (e)=>{
        e.preventDefault();
        setLoadingSearch(true);
        const form = new FormData(e.target);
        const inputValue = Object.fromEntries(form);
        const body_ = inputValue;
        const url = `${process.env.REACT_APP_API_URL_BASE}/api/search/`;
        const headers = {
            'Content-type':'application/json',
            'Authorization': "Bearer " + JSON.parse(localStorage.getItem("authTokens", null))?.access,
        }
        axios.post(url,body_,{headers}).then(res=>{
            let {id,search_title,description,company}  = res.data.result;
            setRecentSearch([...recentSearch,{id,search_title, description, company}]);
            e.target.reset();
            setLoadingSearch(false);
            setNotification(prev=>({...prev,open:true,text:'Task completed successfully.'}));
        }).catch(err => {
            if (err?.response.statusText==='Unauthorized'){
                logoutUser()
            }
            setNotification(prev=>({...prev,open:true,text:err.response.data.detail || err.message,severity:"error"}));
            setLoadingSearch(false);
        })
    }

    return (
        <Container fixed>
            <Box component="form" sx={{m:1}}  onSubmit={handleSubmit}>
                <div className="head-search">
                    <h4 className="title-search">Create Search:</h4>
                </div>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1}}>
                        <Grid item xs={2}>
                            <TextField required fullWidth label="Title" name="search_title" size="small" />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField required fullWidth label="Description" name="description" size="small" />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField required fullWidth label="Amount page" name="mount_page" type="number" defaultValue={1} inputProps={{ min:1, max:10 }} size="small" />
                        </Grid>
                        <Grid item xs={2}>
                            <Select required size="small" fullWidth value={company} label="Service company" name="company" onChange={(e)=>setCompany(e.target.value)} style={{minWidth:"60px"}}>
                                {allCompany.map((item,index)=>{
                                    return <MenuItem key={index} value={item}>{item}</MenuItem>
                                })}
                            </Select>
                        </Grid>
                        <Grid item xs={2}>
                            <Button variant="contained" style={{fontFamily: "Public Sans, sans-serif"}} className={classes.btnCreate} disabled={loadingSearch} type="submit" fullWidth startIcon={
                            !loadingSearch ? <NotStartedOutlinedIcon /> : (
                                <CircularProgress
                                size={24}
                                sx={{color: blue[500]}}
                                />
                            )
                            }>Search
                            </Button>
                        </Grid>
                </Grid>

            </Box>
            {Boolean(recentSearch.length) && (
                <Box sx={{m:1}}>
                    <h4 className="result-search">Recent Search:</h4>
                    <ul>
                    {recentSearch.map((obj,index)=>{
                        return (
                            <li style={{listStyleType: 'circle'}} key={index}>
                                <div style={{display:"flex",alignItems:'center'}}>
                                    <span id="title-result">{obj.search_title}:</span>
                                    <span id="desc-result">{obj.description} - {obj.company}</span>
                                    <Link to={`/dashboart/list-articles/${obj.id}/${obj.company}`}><OpenInBrowserIcon color="primary" fontSize="small" /></Link>
                                </div>
                            </li>
                        )
                    })}
                    </ul>
                    
                </Box>
            )}
            
        </Container>
    )

}


export default SearchArticle;