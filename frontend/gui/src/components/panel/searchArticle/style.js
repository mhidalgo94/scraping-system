import {makeStyles} from '@mui/styles';


const useStyles = makeStyles(()=>({
    btnCreate:{
        fontWeight: 700,
        lineHeight: 2,
        fontSize: "0.875rem",
        textTransform: "capitalize",
        fontFamily: "Public Sans, sans-serif",
        
    },
    btnRemoveTask:{
        marginTop:'4px',
        fontWeight:'700',
        textTransform:'capitalize'
    },
    LoadingData:{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%,-50%)',
    },
    btnDelete:{
        fontWeight: 700,
        lineHeight: 2,
        fontSize: '0.875rem',
        textTransform: 'capitalize',
        fontFamily: 'Public Sans, sans-serif',
    }
}));

export default useStyles;