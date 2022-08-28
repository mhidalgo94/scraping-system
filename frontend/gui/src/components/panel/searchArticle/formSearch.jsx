import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import './searcharticles.css'

function SearchArticle(){
    const [company, setCompany] = useState('ebay')

    const allCompany = ['ebay','amazon']

    return (
        <Container fixed>
            <Box component="form" sx={{m:1}}  noValidate>
                <div className="head-search-articles">
                    <h4 className="title-search-articles">Create Search</h4>
                </div>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={4}>
                            <TextField fullWidth label="Title" name="search_title" size="small" />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField fullWidth label="Description" name="description" size="small" />
                        </Grid>
                        <Grid item xs={1}>
                            <TextField fullWidth label="Amount page" type="number" defaultValue={1} inputProps={{ min:1, max:10 }}
                                size="small" 
                                />
                        </Grid>
                        <Grid item xs={1}>
                            <Select size="small" value={company} label="Company" name="company" onChange={(e)=>setCompany(e.target.value)} style={{minWidth:"60px"}}>
                                {allCompany.map((item,index)=>{
                                    return <MenuItem key={index} value={item}>{item}</MenuItem>
                                })}
                        </Select>
                        </Grid>
                        <Grid item xs={2}>
                            <Button id="btn-success" >Search</Button>
                        </Grid>
                    </Grid>

             </Box>
        </Container>
    )

}


export default SearchArticle;