
import {Typography} from '@mui/material';


function ContentCardHome({number=0, text, classes, icon}){
    return(
        <div style={{display:'flex',justifyContent: 'space-between',alignItems:'center',width:'100%', padding:'0 5px'}}>
            <div>
                <Typography variant="h4" style={{color:'rgb(117, 117, 117)'}}>{number}</Typography>
                <Typography variant="subtitle1" style={{color:'rgb(117, 117, 117)',fontWeight:600,fontFamily: 'Source Sans Pro, sans-serif'}}>{text}</Typography>
            </div>
            <div >
                {icon}
            </div>
        </div>
    )
}

export default ContentCardHome;