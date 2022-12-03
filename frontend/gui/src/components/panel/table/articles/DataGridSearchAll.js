import { useState, useEffect } from "react";
import axios from 'axios'
import Chip from '@mui/material/Chip';
import { DataGrid,GridToolbar} from "@mui/x-data-grid";

import useAuth from "../../../../utils/useAuth";
import NotificationSnackBars from '../../../notification/Notification'

function DataGridSearchAll(){
  const { logoutUser } = useAuth();
  // Var data is for info table
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Component Notification
  const [notification, setNotification] = useState({open:false,text:"",horizontal:"center"})
  
    const NotificationClose = (e) => {
      setNotification((prev)=>({...prev, open:false}));
    };

  const token = JSON.parse(localStorage.getItem("authTokens", null));
  const endpoint = "api/list/search/all/";
  const url = `${process.env.REACT_APP_API_URL_BASE}/${endpoint}`;
  let headers =  {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token?.access,
  }

  
  function StatusRow(cellValues){
    const status = cellValues.row.status
    if (status==='SUCCESS'){
      return (<Chip size="small"  label={status} style={{backgroundColor:'rgba(54, 179, 126, 0.16)',color:'rgb(27, 128, 106)', fontSize:'0.9rem',fontWeight:'600'}} />);
    } else if(status === 'FAILURE'){
      return (<Chip size="small" label={status} style={{backgroundColor:'rgba(255, 86, 48, 0.16)',color:'rgb(183, 29, 24)', fontSize:'0.9rem',fontWeight:'600'}} />);
    }else if(status === 'REVOKED'){
      return (<Chip size="small" label={status} style={{backgroundColor:'rgb(209, 196, 233)',color:'rgb(92, 107, 192)', fontSize:'0.9rem',fontWeight:'600'}} />);
    }else if(status==='PENDING'){
      return (<Chip size="small" label={status} style={{backgroundColor:'rgba(255, 171, 0, 0.16)',color:'rgb(183, 110, 0)', fontSize:'0.9rem',fontWeight:'600'}} />);
    }
    return status
  }
  

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



  const rows = data.map((obj) => ({
    id: obj.id,
    user: obj.user.user_name,
    email: obj.user.email,
    search: obj.search_title,
    company: obj.company,
    mont_page: obj.mont_page,
    status : obj.status_task,
    create_date: new Date(obj.create_date).toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " "),
    scheduled_date: obj.scheduled_date ? new Date(obj.scheduled_date).toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " ") : "Non-scheduled",
    description: obj.description || "without description",
  }));
  
  let columns = [
    { field: "search", headerName: "Search", flex:1 },
    { field: "company", headerName: "Company",description:"Company Search", flex:1 },
    { field: "mont_page", headerName: "Mont Page",width:20,description:"Mont page in paginator",flex:1 },
    { field: "status", headerName: "Status", minWidth: 50 ,flex:1,headerClassName: 'header-bg',renderCell: StatusRow},
    { field: "create_date", headerName: "Date created",minWidth: 200 },
    { field: "scheduled_date", headerName: "Scheduled Date",minWidth: 200 },
    { field: "description", headerName: "Description", flex:1 },
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
      <NotificationSnackBars {...notification} onClose={NotificationClose}  />
    </div>
  );
};

export default DataGridSearchAll;
