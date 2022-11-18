import { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from 'axios';
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined';
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

import useAuth from "../../../../utils/useAuth";
import NotificationSnackBars from '../../../notification/Notification'


const DataGridSearchLogAll = ()=>{
    const { logoutUser } = useAuth();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = JSON.parse(localStorage.getItem("authTokens", null));
    const endpoint = "api/search/logs/";
    const url = `${process.env.REACT_APP_API_URL_BASE}/${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token?.access,
    }
    // Component Notification
    const [notification, setNotification] = useState({open:false,text:"",horizontal:"center"})
    const NotificationClose = (e) => {
      setNotification((prev)=>({...prev, open:false}));
    };
    
    useEffect(()=>{
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
    },[])

    const clickOpenLink =(cellValue)=>{
      let url = cellValue.row.url_page
        window.open(url, '_blank', 'noopener,noreferrer');
    }

    const optionsButtons = (cellValues) => {
      return (
        <>
          <Tooltip
            title="Open Link Page"
            onClick={()=>clickOpenLink(cellValues)}
          >
            <IconButton
              style={{ marginRight: "2px" }}
              aria-label="edit"
              color="warning"
            >
              <InsertLinkOutlinedIcon />
            </IconButton>
          </Tooltip>
          
        </>
      );
    };

    const rows = data.map((obj) => ({
        id: obj.id,
        search: obj.search_request.search_title,
        description: obj.search_request.description || "Without description ",
        status_code: obj.status_code_request,
        page: `${obj.page}/${obj.search_request.mont_page}`,
        company: obj.search_request.company,
        request_date: (new Date(obj.search_request.create_date)).toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " "),//new Date(obj.search_request.create_date).toDateString(),
        create_date: (new Date(obj.date_request)).toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " "),//new Date(obj.date_request).toDateString(),
        url_page : obj.url_page
    }));
      
    let columns = [
        { field: "search", headerName: "Search", flex:1 },
        { field: "description", headerName: "Description", flex:1 },
        { field: "status_code", headerName: "Status Code",width:70, flex:1 },
        { field: "page", headerName: "Page/Mont Page", flex:1 },
        { field: "company", headerName: "Company",description:"Company Search", flex:1 },
        { field: "request_date", headerName: "Date request",minWidth:160},
        { field: "create_date", headerName: "Date created",minWidth:160},
        { field: "url_page", headerName: "URL Page", renderCell:optionsButtons },
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
}

export default DataGridSearchLogAll;