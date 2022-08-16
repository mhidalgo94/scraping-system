import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';


function SkeletonCard(){

  return (
        <Box sx={{ width: 250 }} className='card'>
          <Skeleton sx={{ height: 220 }} animation="wave" variant="rectangular" />
          <Skeleton sx={{ ml:2,mr:1, height:20 }} variant="text" animation="wave" />
          <Skeleton sx={{ ml:2,width:150, height:40 }} animation="wave" />
          <Box sx={{pl:2,pr:2}}>
            <Skeleton variant="text" sx={{pl:2,pr:2}} animation="wave" />
            <Skeleton variant="text" sx={{pl:2,pr:2}} animation="wave" />
          </Box>
        </Box>
)}

export default SkeletonCard;