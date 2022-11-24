import {Box, Typography} from '@mui/material';


function LastSearch(){

    return (
        <div style={{paddingTop:'10px',paddingLeft:'20px'}}>
            <Box style={{paddingTop:'15px'}}>
                <div>
                    <Typography variant="h5" style={{fontSize: '1.125rem',fontWeight:700}}>Last Search</Typography>                
                </div>
                {/* <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}> */}
                    <div style={{display:'flex', justifyContent:'space-between',paddingRight:'10px'}}>
                        <Typography variant="h6">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</Typography>                
                        <Typography variant="subtitle2">02/04/22</Typography>                
                    </div>              
                    <div  style={{display:'flex', justifyContent:'space-between',paddingRight:'10px'}}>
                        <Typography variant="body1">Lorem ipsum dolor sit amet, consectetur adipisicing elit.Lorem ipsum dolor sit amet, consectetur adipisicing elit.</Typography>  
                        <Typography variant="subtitle2">SUCCESS</Typography>  
                    </div>
                {/* </div> */}
            </Box>
        </div>
    )
}

export default LastSearch;