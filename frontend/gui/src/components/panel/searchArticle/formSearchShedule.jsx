import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import AlarmIcon from '@mui/icons-material/Alarm';
import SearchSheduleComponentList from './addScheduledSearch'
import './searcharticles.css'


function SheduleSearch(){
    const [company, setCompany] = useState('ebay')
    const allCompany = ['ebay','amazon']


    const [dataComponent, setDataComponent] = useState([])

    const handleSubmit = (e)=>{
        e.preventDefault();
        const form = new FormData(e.target);
        const inputValue = Object.fromEntries(form);
        inputValue["statusTask"] = inputValue.search_title
        console.log(inputValue);
        // [...recentSearch,inputValue]
        setDataComponent([...dataComponent,{inputValue}])

    }

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
                        <Grid item xs={2}>
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
                                    defaultValue="2017-05-24T10:30"
                                    name="dateSearch" fullWidth
                                />
                        </Grid>
                        <Grid item xs={1} style={{display:'flex'}}>
                            <Button id="btn-success" type="submit" fullWidth startIcon={<AlarmIcon />}>Add</Button>
                        </Grid>
                </Grid>

            </Box>
            {Boolean(Object.values(dataComponent).length) && (
                <div style={{margin: "8px",padding: "2px 0 13px 0"}}>
                    <div className="head-search">
                        <h4 className="title-search">Scheduled Taks:</h4>
                    </div>
                    {dataComponent.map((obj,index) => <SearchSheduleComponentList key={index} {...obj} />)}
                </div>
            )}
        </Container>
        
    )
}

export default SheduleSearch;