import {makeStyles} from '@mui/styles';


const useStyles = makeStyles(()=>({
    PaperTitle:{
        height: '100%',
        alignItems:'center',
        paddingTop:'3px',
        paddingBottom:'2px',
        paddingLeft:'20px',
        textAlign: 'left',
        backgroundColor: 'rgb(255, 255, 255)',
        color: 'rgb(33, 43, 54)',
        transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        backgroundImage: 'none',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: 'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px',
        borderRadius: '16px',
        zIndex: 0,
    },
    titleHome:{
        fontWeight: 600,
        marginTop:'10px !important',
        color: 'rgb(0, 82, 73)',
        fontFamily: 'Source Sans Pro, sans-serif !important',
    },
    SubtitleHome:{
        fontWeight: 500,
        color: 'rgb(0, 82, 73)',
        fontFamily: 'Source Sans Pro, sans-serif !important',
        letterSparcing:'1px'
    },
    LinkSearch:{
        width:'100px',
        marginTop:'5px',
        padding: '5px',
        backgroundColor: 'rgb(0, 171, 85)',
        textDecoration: 'none',
        fontSize: '17px',
        textAlign:'center',
        borderRadius: '11px',
        color: 'rgb(255, 255, 255)',
        transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        boxShadow: 'rgb(0 171 85 / 24%) 0px 8px 13px 0px',
        "&:hover": {
            backgroundColor: "rgb(46, 125, 50)",
        },
    },
    LinkResult:{
        width:'100px',
        marginTop:'5px',
        marginLeft:'5px',
        padding: '5px',
        backgroundColor: 'rgb(79, 195, 247)',
        textDecoration: 'none',
        fontSize: '17px',
        textAlign:'center',
        borderRadius: '11px',
        color: 'rgb(255, 255, 255)',
        transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        boxShadow: 'rgb(79 195 247 / 24%) 0px 8px 13px 0px',
        "&:hover": {
            backgroundColor: "rgb(3, 155, 229)",
        },
    },
    CardHome:{
        backgroundColor: 'rgb(255, 255, 255)',
        color: 'rgb(33, 43, 54)',
        transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        backgroundImage: 'none',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: 'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px',
        borderRadius: '16px',
        zIndex: 0,
        display: 'flex',
        alignItems: 'center',
        padding: '24px',
    },
    DataGridContainer:{
        backgroundColor: 'rgb(255, 255, 255)',
        transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        overflow: 'hidden',
        boxShadow: 'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px',
        borderRadius: '16px',
    },
    GraficContainer:{
        width:'100%',
        display:'grid',
        justifyContent:'center',
        backgroundColor: 'rgb(255, 255, 255)',
        overflow: 'hidden',
        boxShadow: 'rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px',
        borderRadius: '16px',
        minHeight:'480px',

        transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    },
    TitleTable:{
        marginBottom:'8px !important',
        paddingTop:'21px', 
        paddingLeft:'24px',
        fontWeight: 500,
        fontFamily: 'Source Sans Pro, sans-serif !important',

    }
}));

export default useStyles;