
import {makeStyles} from '@mui/styles';


const useStyles = makeStyles(()=>({
    Menu:{
        marginTop:"17px",
        marginRight:"10px",
        borderRadius:"12px", 
        minWidth:"300px",
        maxHeight:"500px",
        paddingBottom:"0px",
        fontFamily: "Public Sans, sans-serif"
    },
    HeaderMenu:{
        display:"flex",
        margin:0,
        alignItems:'center',
        justifyContent:"space-between",
        padding:'0 10px',
        fontFamily: "Public Sans, sans-serif"
    },
    Container:{
        paddingLeft:"0px",
        marginLeft:'0px',
        maxHeight:"500px",
        
    },
    MenuItemContainer:{
        margin:'2px 5px',
        borderRadius: '8px',
    },
    MenuItemSuccess:{
        fontFamily: "Public Sans, sans-serif",
        "&:hover":{
            background:"rgb(200, 230, 201)"
        }
    },
    MenuItemRevoked:{
        fontFamily: "Public Sans, sans-serif",
        "&:hover":{
            background:"rgb(225, 190, 231)",
        }
    },
    MenuItemPending:{
        fontFamily: "Public Sans, sans-serif",
        "&:hover":{
            background:"rgb(187, 222, 251)"
        }
    },
    MenuItemError:{
        fontFamily: "Public Sans, sans-serif",
        "&:hover":{
            background:"rgb(255, 205, 210)",
        }
    },
    MenuItemLink:{
        color: "rgb(99, 115, 129)",
        width:"100%",
        borderRadius:'8px',
        margin:"2px 5px",
        fontFamily: "Public Sans, sans-serif",
        lineHeight:1.57143,
        fontSize: "0.875rem",
        fontWeight:600,
        textDecoration: "none",
    }
}));

export default useStyles;