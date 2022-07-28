import { useState, useEffect } from "react";
import { DataGrid, GridToolbarContainer, GridToolbarExport, } from "@mui/x-data-grid";
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined';
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

// import DialogConfirm from "../../dialog/dialogconfirm";
// import NotificationSnackBars from '../../notification/Notification'
import useAuth from "../../../utils/useAuth";

function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport csvOptions={{fileName: 'SearchLog'}} />
      </GridToolbarContainer>
    );
}

const DataGridSearchLog = ()=>{
    const { logoutUser } = useAuth();
    const [data, setData] = useState([]);
    
    const [loading, setLoading] = useState(true);
    

    const getData = async () => {
        setLoading(true);
        const token = JSON.parse(localStorage.getItem("authTokens", null));
        const endpoint = "api/search/logs/";
        const url = `${process.env.REACT_APP_API_URL_BASE}/${endpoint}`;
        await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token?.access,
          },
        })
          .then((res) => res.json())
          .then((res) => {
            if (res.code === "token_not_valid") {
              logoutUser();
            }
            console.log(res.results)
            setData(res.results);
            setLoading(false);
          });
      };
    
    useEffect(()=>{
        getData()
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
        // user_name: obj.search_request.user.user_name,
        status_code: obj.status_code_request,
        page: `${obj.page}/${obj.search_request.mont_page}`,
        company: obj.search_request.company,
        request_date: new Date(obj.search_request.create_date).toDateString(),
        create_date: new Date(obj.date_request).toDateString(),
        url_page : obj.url_page
    }));
      
    let columns = [
        { field: "search", headerName: "Search", minWidth: 210,flex:1 },
        // { field: "user_name", headerName: "User", minWidth: 210,flex:1 },
        { field: "description", headerName: "Description", minWidth: 210,flex:1 },
        { field: "status_code", headerName: "Status Code", minWidth: 100,flex:1 },
        { field: "page", headerName: "Page/Mont Page", minWidth: 100,flex:1 },
        { field: "company", headerName: "Company",description:"Company Search", minWidth: 150,flex:1 },
        { field: "request_date", headerName: "Date request", width: 150 },
        { field: "create_date", headerName: "Date created", width: 150 },
        { field: "url_page", headerName: "URL Page", width: 150, renderCell:optionsButtons },
    ];




    return (
        <div style={{ height: 600, width: "100%"}}>
          <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            components={{ Toolbar: CustomToolbar }}
            pageSize={10}
            checkboxSelection
            disableSelectionOnClick
            rowsPerPageOptions={[10]}
          />
          {/* <DialogConfirm
            fullWidth={true}
            maxWidth='sm'
            open={openDialog}
            setOpen={setOpenDialog}
            loading={loading}
            onAcept={onAcept}
            title={textDialog.title}
            content={textDialog.content}
            loadingAcept={loadingAcept}
            disabledAcept={disabledAcept}
            setDisabledAcept={setDisabledAcept}
          />
          <NotificationSnackBars {...notification} onClose={NotificationClose}  /> */}
        </div>
      );
}

export default DataGridSearchLog