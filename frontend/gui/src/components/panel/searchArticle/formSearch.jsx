import { useState } from 'react';
import {Link} from 'react-router-dom'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import NotStartedOutlinedIcon from '@mui/icons-material/NotStartedOutlined';



import './searcharticles.css'

function SearchArticle(){
    const [company, setCompany] = useState('ebay')
    const allCompany = ['ebay','amazon']
    const [recentSearch, setRecentSearch] = useState([])


    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(e);
        const form = new FormData(e.target);
        const inputValue = Object.fromEntries(form);
        setRecentSearch([...recentSearch,inputValue])
        e.target.reset();
    }

    return (
        <Container fixed>
            <Box component="form" sx={{m:1}}  noValidate onSubmit={handleSubmit}>
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
                        <Grid item xs={1}>
                            <TextField required fullWidth label="Amount page" name="mount_page" type="number" defaultValue={1} inputProps={{ min:1, max:10 }}
                                size="small" 
                                />
                        </Grid>
                        <Grid item xs={2}>
                            <Select required size="small" fullWidth value={company} label="Service company" name="company" onChange={(e)=>setCompany(e.target.value)} style={{minWidth:"60px"}}>
                                {allCompany.map((item,index)=>{
                                    return <MenuItem key={index} value={item}>{item}</MenuItem>
                                })}
                            </Select>
                        </Grid>
                        <Grid item xs={2}>
                            <Button id="btn-success" type="submit" fullWidth startIcon={<NotStartedOutlinedIcon />}>Search</Button>
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
                                    <Link to="#"><OpenInBrowserIcon color="primary" fontSize="small" /></Link>
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