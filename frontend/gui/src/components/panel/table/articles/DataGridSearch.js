import { useState, useEffect } from "react";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import TextField from '@mui/material/TextField';
// Icons
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import { DataGrid,GridActionsCellItem,GridToolbar} from "@mui/x-data-grid";
// Dialog Confirm and Notification
import DialogConfirm from "../../../dialog/dialogconfirm";
import useAuth from "../../../../utils/useAuth";
import NotificationSnackBars from '../../../notification/Notification'


function ContentDialogEdit({search, description,setEditSearch,setEditDescription}){
  setEditSearch(search)
  setEditDescription(description)
  return (
    <>
      <TextField
        autoFocus
        margin="dense"
        id="search"
        label="Search"
        type="email"
        fullWidth
        variant="standard"
        defaultValue={search}
        onChange={e=>setEditSearch(e.target.value)}
      />
      <TextField
        margin="dense"
        id="description"
        label="Description"
        type="text"
        fullWidth
        variant="standard"
        defaultValue={description}
        onChange={e=>setEditDescription(e.target.value)}

      />
    </>

  )
}


function DataGridSearch(){
  const { logoutUser } = useAuth();
  const navigate = useNavigate()
  // Var data is for info table
  const [data, setData] = useState([]);
  // This loading es for loading fetch data
  const [actionButtonsRows,setActionButtons] = useState({})
  const [editSearch,setEditSearch] = useState(null)
  const [editDescription,setEditDescription] = useState(null)
  const [loading, setLoading] = useState(true);
  // State for dialog for delete
  const [textDialog, setTextDialog] = useState({title:"Confirm!", content:"You are sure make this?"})
  const [openDialog, setOpenDialog] = useState(false); // Open dialog component
  const [loadingAcept, setLoadingAcept] = useState(false) // this loading is for process the fetch delete or edit data row
  // Component Notification
  const [notification, setNotification] = useState({open:false,text:"",horizontal:"center"})

  const token = JSON.parse(localStorage.getItem("authTokens", null));
  const endpoint = "api/list/search/";
  const url = `${process.env.REACT_APP_API_URL_BASE}/${endpoint}`;
  let headers =  {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token?.access,
  }

  const getData = () => {
    setLoading(true);
    axios.get(url,{headers}).then(res=>{
      setData(res.data.results);
      setLoading(false);
    }).catch(err=>{
      if (err.response.statusText==='Unauthorized'){
        logoutUser();
      }
      setNotification( prev=>({...prev,open:true,text:err.message,severity:"error"}));
      
    });
  };



  useEffect(() => {
    axios.get(url,{headers}).then(res=>{
      setData(res.data.results);
      setLoading(false);
    }).catch(err=>{
      if (err.response.statusText==='Unauthorized'){
        logoutUser();
      }
      setNotification( prev=>({...prev,open:true,text:err.message,severity:"error"}));
      
    });

    // eslint-disable-next-line
  }, []);


  const onAcept = () => {
    const action = actionButtonsRows.action;
    const id = actionButtonsRows.values.id;
    let endpoint_ = `api/search/${id}/${action}/`;
    let url_ = `${process.env.REACT_APP_API_URL_BASE}/${endpoint_}`;
    let body = {search_title:editSearch,description:editDescription}
    setLoadingAcept(true);
    switch(action){
      case 'update':
        axios.put(url_,body,{headers}).then(res=>{
          setNotification( prev=>({...prev,open:true,text:"Your search has been successfully updated",severity:"success"}));
          setLoadingAcept(false);
          setOpenDialog(false)
          getData();
          
        }).catch(err=>{
          if (err.response.statusText==='Unauthorized'){
            logoutUser();
          }
          setLoading(false);
          setOpenDialog(false);
          setLoadingAcept(false);
          setNotification( prev=>({...prev,open:true,text:err.message,severity:"error"}));
          
        });
        break;
      case 'delete':
        axios.delete(url_,{headers}).then(res=>{
          setLoadingAcept(false);
          setOpenDialog(false)
          getData();

        }).catch(err=>{
          if (err.response.statusText==='Unauthorized'){
            logoutUser();
          }
          setLoading(false);
          setOpenDialog(false);
          setLoadingAcept(false);
          setNotification( prev=>({...prev,open:true,text:err.message,severity:"error"}));
        });
          break
        default:
          setNotification( prev=>({...prev,open:true,text:"Error server",severity:"error"}));
          break;
      }
    }


  const NotificationClose = (e) => {
    setNotification((prev)=>({...prev, open:false}));
  };

  const clickEdit = (event, cellValues) => {
    
    setTextDialog(prev=>({...prev,title:"Edit Search",content: <ContentDialogEdit setEditDescription={setEditDescription} setEditSearch={setEditSearch} search={cellValues.row.search} description={cellValues.row.description}/> }));
    setActionButtons({action:"update",values:cellValues});

    setOpenDialog(true);

  };

  const clickDelete = (event,cellValues)=>{
    setActionButtons({action:"delete",values:cellValues});
    setTextDialog((prev)=>({...prev,title:"Delete Record",content:`You want delete '${cellValues.row.search}'?`}));

    setOpenDialog(true)
  }

  const clickViewArticles = (event,cellValues)=>{
    const id_ = cellValues.row.id
    const company_ = cellValues.row.company
    navigate(`/dashboart/list-articles/${id_}/${company_}`)
  }

  const clickViewLogArticles = (event,cellValues)=>{
    const id_ = cellValues.row.id
    navigate(`/dashboart/search-log/${id_}`)
  }


  const rows = data.map((obj) => ({
    id: obj.id,
    user: obj.user.user_name,
    email: obj.user.email,
    search: obj.search_title,
    company: obj.company,
    mont_page: obj.mont_page,
    create_date: (new Date(obj.create_date)).toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " "),//new Date(obj.create_date).toDateString(),
    description: obj.description || "without description",
  }));
  
  let columns = [
    { field: "search", headerName: "Search", flex:1 },
    { field: "company", headerName: "Company",description:"Company Search", flex:1 },
    { field: "mont_page", headerName: "Mont Page",width:70,description:"Mont page in paginator",flex:1 },
    { field: "create_date", headerName: "Date created",minWidth: 200 },
    { field: "description", headerName: "Description", flex:1 },
    { field: "actions",type: "actions", headerName: "Options", minWidth: 100, getActions: (params)=>[
      <GridActionsCellItem style={{color: "#1976d2", paddingTop:'0px',paddingBottom:'0px'}} icon={<OpenInBrowserIcon color='primary'/>} label="View Result" onClick={(event)=>clickViewArticles(event,params)} />,
      <GridActionsCellItem style={{color:'#2e7d32', paddingTop:'0px',paddingBottom:'0px'}} icon={<SummarizeOutlinedIcon color='success'/>} label="View Log" onClick={(event)=>clickViewLogArticles(event,params)} showInMenu/>,
      <GridActionsCellItem style={{color:'#ed6c02', paddingTop:'0px',paddingBottom:'0px'}} icon={<ModeEditOutlineOutlinedIcon color='warning'/>} label="Edit" onClick={(event)=>clickEdit(event,params)} showInMenu/>,
      <GridActionsCellItem style={{color:'#d32f2f', paddingTop:'0px',paddingBottom:'0px'}} icon={<DeleteOutlinedIcon color='error'/>} label="Delete" onClick={(event)=>clickDelete(event,params)} showInMenu/>,
      ],felx:1},
  ];

  return (
    <div style={{ height: 600, width: "100%"}}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        components={{ Toolbar: GridToolbar }}
        pageSize={10}
        checkboxSelection
        disableSelectionOnClick
        rowsPerPageOptions={[10]}
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
};

export default DataGridSearch;
