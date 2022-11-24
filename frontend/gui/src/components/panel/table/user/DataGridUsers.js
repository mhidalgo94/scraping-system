import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import NotificationSnackBars from '../../../notification/Notification'
import DialogConfirm from "../../../dialog/dialogconfirm";
import { DataGrid, GridActionsCellItem, GridToolbar} from "@mui/x-data-grid";
import useAuth from "../../../../utils/useAuth";
import './griduser.css';

function RowImagenFullName(cellValues){
  const {firstname, lastname,img} = cellValues.row;
  const full_name = `${firstname} ${lastname}`;
  return (
    <Stack direction="row" spacing={2} style={{alignItems:'center'}}>
      <Avatar alt={full_name} src={img} />
      <h5 className="row-user-fullname" >{full_name}</h5>
    </Stack>

  )
}


function StatusRow(cellValues){
  const status = cellValues.row.status ? (
  <Chip size="small"  label="Active" style={{backgroundColor:'rgba(84, 214, 44, 0.16)', fontSize:'0.9rem',fontWeight:'600'}} />
  )
   : 
   (<Chip size="small" label="Banned" color="error" style={{backgroundColor:'rgba(255, 72, 66, 0.16)',fontSize:'0.9rem',fontWeight:'600'}} />);
  return status
}

const DataGridUsers = ({status=null})=>{
  const { logoutUser } = useAuth();
  const [stateUser, setStateUser] = useState(false)
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [idActions, setIdActions] = useState(null);
  const navigate = useNavigate();
  // State for dialog for delete
  const [textDialog, setTextDialog] = useState({title:"Confirm!", content:"You are sure make this?"});
  const [openDialog, setOpenDialog] = useState(false); // Open dialog component
  const [loadingAcept, setLoadingAcept] = useState(false); // this loading is for process the fetch delete or edit data row
  
  // State for component notification
  const [notification, setNotification] = useState({open:false,text:"",horizontal:"center"});
  const NotificationClose = (e) => {
    setNotification((prev)=>({...prev, open:false}));
  };
  

  useEffect(() => {
    setLoading(true);
    const headers = {
      'Content-type':'application/json',
      'Authorization': "Bearer " + JSON.parse(localStorage.getItem("authTokens", null))?.access,
    }
    const endpoint = (status===null) ? `api/user/list/` : `api/user/list/?status=${status}`;
    const url = `${process.env.REACT_APP_API_URL_BASE}/${endpoint}`;
    axios.get(url,{headers}).then(res=>{
      setData(res.data.results)
      setLoading(false)
    }).catch(err=>{
      if(err.response.statusText && err.response.statusText === "Unauthorized"){
        logoutUser()
      }

    })
    return setStateUser(false)
  },[stateUser,logoutUser,status]);

  const onAcept = ()=>{
    setLoadingAcept(true)
    const headers = {
      'Content-type':'application/json',
      'Authorization': "Bearer " + JSON.parse(localStorage.getItem("authTokens", null)).access,
    }
    const endpoint = `api/user/${idActions}/destroy/`;
    const url =  `${process.env.REACT_APP_API_URL_BASE}/${endpoint}`;
    axios.delete(url,{headers}).then(res=>{
      setNotification({open:true, text:"User deleted successfully.", severity:'success'});
      setLoadingAcept(false);
      setOpenDialog(false)
      setStateUser(true);
    }).catch(err=>{
      if(err.response.statusText && err.response.statusText === "Unauthorized"){
        logoutUser();
      }
      setLoadingAcept(false);
      setOpenDialog(false)
      setNotification({open:true, text:err.response.data.detail || err.message, severity:'error'});
    })
  }

  const handleDelete = (event,params)=>{
    setIdActions(params.id)
    setTextDialog({title:"Delete user!", content:`Are you sure delete this user: ${params.id}?`})
    setOpenDialog(true)

  }
  const handleEdit = (event, params)=>{
    navigate(`/dashboart/user/${params.id}`)
  }
 
  const rows = data?.map((obj) =>({
    id: obj.user_name,
    firstname: obj.firstname,
    lastname: obj.lastname,
    username: obj.user_name,
    email : obj.email,
    status : obj.is_active,
    last_login :  (new Date(obj.last_login)).toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " "),//new Date(obj.create_date).toDateString(),
    img: obj.img || '/images/default-image-avatar.jpg',

  }));
  
  let columns = [
    { field: "id", hide: true },
    { field: "user", headerName: "User", minWidth: 250, renderCell: RowImagenFullName, disableClickEventBubbling: true,felx:1},
    { field: "username", headerName: "Username", minWidth: 50 ,flex:1},
    { field: "email", headerName: "Email",description:"Email user", minWidth: 50 ,flex:1},
    { field: "last_login",type:"dateTime", headerName: "Last Login",description:"last login to system", minWidth: 50 ,flex:1},
    { field: "status",type:"number",editable:true, headerName: "Status",description:"User status",renderCell: StatusRow, maxWidth: 100 ,flex:1},
    { field: "actions",type: "actions", headerName: "Options", minWidth: 100, getActions: (params)=>[
      <GridActionsCellItem style={{color:'#ed6c02'}} icon={<ModeEditOutlineOutlinedIcon color='warning'/>} label="Edit" onClick={(event)=>handleEdit(event,params)}  showInMenu/>,
      <GridActionsCellItem style={{color:'red', paddingTop:'0px',paddingBottom:'0px'}} icon={<DeleteIcon color='error'/>} label="Delete" onClick={(event)=>handleDelete(event,params)} showInMenu/>
      ],felx:1},
  ];

    return (
        <div style={{ height: 600, width: "100%"}}>
          <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            components={{ Toolbar: GridToolbar }}
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
        onAcept={onAcept}
        title={textDialog.title}
        content={textDialog.content}
        loadingAcept={loadingAcept}
      />

          <NotificationSnackBars {...notification} onClose={NotificationClose}  />
        </div>
      );
}

export default DataGridUsers;