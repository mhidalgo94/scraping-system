import { useState, useEffect } from "react";
import {useParams} from 'react-router-dom'
import axios from 'axios'
import Tooltip from "@mui/material/Tooltip";
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined';
import CheckedComponent from '../../../checked/checkedComponent'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Rating from '@mui/material/Rating';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogConfirm from '../../../dialog/dialogconfirm'
import NotificationSnackBars from '../../../notification/Notification'
import { DataGrid, GridToolbarContainer, GridToolbarExport,GridActionsCellItem} from "@mui/x-data-grid";

import useAuth from "../../../../utils/useAuth";

function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport csvOptions={{fileName: 'Search'}}/>
      </GridToolbarContainer>
    );
  }

const DataGridArticles = ()=>{

  const { logoutUser } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const {searchId,company} = useParams()
  const token = JSON.parse(localStorage.getItem("authTokens", null));
  const headers = {
    Authorization: "Bearer " + token?.access,
  }
  // Id for delete
  const [idDelete, setIdDelete] = useState(null)

  // state for Dialog confirm
  const [openDialog, setOpenDialog] = useState(false)
  const [textDialog,setTextDialog] = useState({title:"",content:""})
  const [loadingAcept, setLoadingAcept] = useState(false)

  // State for component notification
  const [notification, setNotification] = useState({open:false,text:"",horizontal:"center"})
  const NotificationClose = (e) => {
    setNotification((prev)=>({...prev, open:false}));
  };

  const getData = () => {
    setLoading(true);
    const endpoint = `api/list/articles/${searchId}/`;
    const url = `${process.env.REACT_APP_API_URL_BASE}/${endpoint}`;
    
    axios.get(url,{headers}).then(res=> {
      setData(res.data.articles);
      setLoading(false);
    }).catch(err=> {
      if (err.response.statusText==='Unauthorized'){
        setLoadingAcept(false);
        logoutUser();
      }
      setNotification( prev=>({...prev,open:true,text:err.message,severity:"error"}));
      setLoading(false);
    })
  };

  useEffect(() => {
    
    getData()
    // eslint-disable-next-line
  }, []);


  const onAcept = (cellValues)=>{
    setLoadingAcept(true);
    const endpoint = `api/${company}/${idDelete}/delete/`
    const url = `${process.env.REACT_APP_API_URL_BASE}/${endpoint}`; 
    axios.delete(url,{headers}).then(res=>{
      let text = 'Your item has been successfully deleted';
      setNotification(prev=>({...prev,open:true, text,severity:'success'}));
      setLoadingAcept(false);
      setOpenDialog(false)

      getData();
    }).catch(err=>{
      if (err.response.statusText==='Unauthorized'){
        logoutUser();
      }
      setOpenDialog(false)
      setLoadingAcept(false);

      setNotification(prev=>({...prev,open:true, text:err.message,severity:'error'}));
    })

  }

  const deleteArticle= (event,cellValues) =>{
    setTextDialog(prev=>({...prev,title:"Delete Article", content:`You are sure delete '${cellValues.row.product}'?`}))
    setIdDelete(cellValues.row.id)
    setOpenDialog(true)
    setLoadingAcept(false)

  }

  
  const editFavorite = async (event,cellValues)=>{
    const {id,product,img,url_product,price,old_price} = cellValues.row;
    let body = {product,img,url_product,price,old_price,favorite:event.target.checked};
    const endpoint = `api/${company}/${id}/update/`
    const url = `${process.env.REACT_APP_API_URL_BASE}/${endpoint}`;
    
    const validateChecked = await axios.put(url,body,{headers}).then(res=>{
      setLoadingAcept(false);
      let text = `Your article has been ${!event.target.checked ? 'added ' : 'removed '} favorite`
      setNotification(prev=>({...prev,open:true, text,severity:'success'}))
      return true;
    }).catch(err=>{
      if (err.response.statusText==='Unauthorized'){
        setLoadingAcept(false);
        logoutUser();
      }
      setNotification(prev=>({...prev,open:true, text:err.message,severity:'error'}));
      return false
    })
    return validateChecked
  }
    
  const clickViewArticles = (event,cellValues)=>{
    const {url_product} = cellValues.row;
    window.open(url_product, '_blank', 'noopener,noreferrer');
  }

  const columnsFavorite =(cellValues)=>{
    const favorite = cellValues.row.favorite
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    return (
      <Tooltip title='Add favorite'>
        <CheckedComponent validate={true} {...label} checked={favorite}  icon={<FavoriteBorder color='warining'/>} checkedIcon={<Favorite color='warning' />} values={cellValues}  callBack={editFavorite} />
      </Tooltip>
    )
  }

  const ratingRow = (cellValues)=>{
    let value = String(cellValues.row.rate).slice(0,3)
    return (
        <Tooltip title={`Rate ${cellValues.row.rate}`}>
          <Rating readOnly name="rating" value={parseInt(value)} />
        </Tooltip>
    );
  }


  const rows = data.map((obj) =>({
    id: obj.id,
    product: obj.product,
    price : obj.price,
    old_price : obj.old_price || 0,
    get_save: (obj.get_save > 0 ) ? obj.get_save : 0,
    create_date :  (new Date(obj.create_date)).toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " "),//new Date(obj.create_date).toDateString(),
    rate: obj.rate || 0,
    img: obj.img,
    favorite: obj.favorite,
    url_product: obj.url_product,
    company:obj.company,

  }));
  
  let columns = [
    { field: "product", headerName: "Product", minWidth: 100,flex:1 },
    { field: "price",type:'number', headerName: "Precio", minWidth: 50 ,flex:1},
    { field: "old_price",type:'number', headerName: "Old Price",description:"If is 0 not get ", minWidth: 50 ,flex:1},
    { field: "get_save",type:'number', headerName: "You Save",description:"How much do you save", minWidth: 50 ,flex:1},
    { field: "rate", type:'number',headerName: "Rating", description:"Rate Product",minWidth: 100,renderCell: ratingRow,flex:1 },
    { field: "create_date", type:"dateTime",headerName: "Date created", width: 100,flex:1 },
    { field: "favorite", type:'number',headerName: "Favorite", description:"Select your favorite article", renderCell:columnsFavorite,minWidth: 50 ,flex:1},
    // { field: "options", headerName: "Options", minWidth: 100, renderCell: optionsButtons, disableClickEventBubbling: true,felx:1},
    { field: "actions",type: "actions", headerName: "Options", minWidth: 100, getActions: (params)=>[
      <GridActionsCellItem style={{color: "#1976d2", paddingTop:'0px',paddingBottom:'0px'}} icon={<InsertLinkOutlinedIcon color='primary'/>} label="Link Article" onClick={(event)=>clickViewArticles(event,params)} showInMenu/>,
      <GridActionsCellItem style={{color:'red', paddingTop:'0px',paddingBottom:'0px'}} icon={<DeleteIcon color='error'/>} label="Delete" onClick={(event)=>deleteArticle(event,params)} showInMenu/>,
      ],felx:1},
  ];




    return (
        <div style={{ height: 600, width: "100%"}}>
          <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            components={{ Toolbar: CustomToolbar }}
            pageSize={30}
            checkboxSelection
            disableSelectionOnClick
            rowsPerPageOptions={[30]}
          />
          <DialogConfirm
            fullWidth={true}
            maxWidth='sm'
            open={openDialog}
            setOpen={setOpenDialog}
            loading={loading}
            onAcept={onAcept}
            title={textDialog.title}
            content={textDialog.content}
            loadingAcept={loadingAcept}
          />
          <NotificationSnackBars {...notification} onClose={NotificationClose}  />
        </div>
      );
}



export default DataGridArticles;