import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';


function StatusTask({statusTask}){
    if (statusTask === "success"){
        return ( 
        <Chip size="small"  label={statusTask} style={{backgroundColor:'rgba(84, 214, 44, 0.16)',color:'rgb(34, 154, 22)', fontSize:'0.9rem',fontWeight:'600'}} />
        )
    }else if(statusTask === "progress"){
        return (
        <Chip size="small" label={statusTask} style={{backgroundColor:'rgba(255, 193, 7, 0.16)',color:'rgb(183, 129, 3)', fontSize:'0.9rem',fontWeight:'600'}} />
        )
    }else if(statusTask === "error"){
        return (
        <Chip size="small" label={statusTask} color="error" style={{backgroundColor:'rgba(255, 72, 66, 0.16)',color:'rgb(183, 33, 54)', fontSize:'0.9rem',fontWeight:'600'}} />
        )
    }
      
  }

function SearchSheduleComponentList({inputValue,statusTask}){
    const [dataState, setDataState] = useState({...inputValue})
    const allCompany = ['ebay','amazon']
    console.log(dataState)
    const handleSubmit = (e)=>{
        e.preventDefault()
        console.log('submit')
    }
    return (
        <Container fixed style={{m:0, padding:0}}>
            <Box component="form" sx={{padding:'2px 0 13px 0'}} noValidate onSubmit={handleSubmit}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1}}>
                    <Grid item xs={2}>
                        <TextField required value={dataState.search_title} fullWidth label="Title" name="search_title" size="small" />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField required value={dataState.description} fullWidth label="Description" name="description" size="small" />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField required value={dataState.page} fullWidth label="Amount page" name="mount_page" type="number" defaultValue={1} inputProps={{ min:1, max:10 }}
                            size="small" 
                            />
                    </Grid>
                    <Grid item xs={2}>
                        <Select size="small" fullWidth value={dataState.company} label="Service company" name="company" onChange={(e)=>setDataState(({...dataState,company:e.target.value}))} style={{minWidth:"60px"}}>
                            {allCompany.map((item,index)=>{
                                return <MenuItem key={index} value={item}>{item}</MenuItem>
                            })}
                        </Select>
                    </Grid>
                    <Grid item xs={3}>
                    <TextField
                            size="small"
                            type="datetime-local"
                            value={dataState.dateSearch}
                            name="dateSearch" fullWidth
                        />
                    </Grid>
                    <Grid item xs={1} style={{display:'flex'}}>
                        <Button id="btn-warning" variant="contained" type="submit" fullWidth startIcon={<SaveOutlinedIcon />}>Save</Button>
                    </Grid>
                </Grid>
                <div style={{display:'flex',alignItems:'center', justifyContent:'space-between'}}>
                    {/* Aqui va el estado de la tarea */}
                    <span style={{fontWeight:700,lineHeight:1.71429,color:"rgb(133, 141, 150)"}}>Status: <StatusTask statusTask={dataState.statusTask} /> </span>  
                    <Button style={{marginTop:'4px',fontWeight:'700',textTransform:'capitalize'}} color="error" size='small' startIcon={<DeleteForeverOutlinedIcon />}>Remove</Button>
                </div>
            </Box>
        </Container>
    )
}

export default SearchSheduleComponentList;