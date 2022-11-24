import {makeStyles} from '@mui/styles';


const useStyles = makeStyles(()=>({
    BtnSave:{
        fontFamily: 'Source Sans Pro, sans-serif !important',
        fontWeight: '700 !important',
        backgroundColor: 'rgb(0, 171, 85) !important',
        boxShadow: 'rgb(0 171 85 / 24%) 0px 8px 13px 0px !important',
        transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important',
        '&:hover':{
            backgroundColor: 'rgb(0, 123, 85) !important',
        }
    
    }



}))



export default useStyles;