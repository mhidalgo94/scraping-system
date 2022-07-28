import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import TextField from '@mui/material/TextField';
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Tooltip from "@mui/material/Tooltip";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import DialogConfirm from "../../dialog/dialogconfirm";
import useAuth from "../../../utils/useAuth";
import NotificationSnackBars from '../../notification/Notification'

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport csvOptions={{fileName: 'Search'}}/>
    </GridToolbarContainer>
  );
}




const DataGridSearch = () => {
  const { logoutUser } = useAuth();
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
  const [disabledAcept, setDisabledAcept] = useState(false) // disabled button accept in dialog component
  // Component Notification
  const [notification, setNotification] = useState({open:false,text:"",horizontal:"center"})


  const getData = async () => {
    setLoading(true);
    const token = JSON.parse(localStorage.getItem("authTokens", null));
    const endpoint = "api/list/search/";
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
        setData(res.results);
        setLoading(false);
      });
  };



  useEffect(() => {
    getData();

    // eslint-disable-next-line
  }, []);


  const onAcept = async () => {
    const action = actionButtonsRows.action;
    const id = actionButtonsRows.values.id
    const token = JSON.parse(localStorage.getItem("authTokens", null));
    let endpoint = ""
    let method = 'PUT' 
    let body = {search_title:editSearch,description:editDescription}
    console.log(body)
    if(action==='edit'){
      endpoint = `api/search/${id}/update/`
    }else if(action==='delete'){
      endpoint = `api/search/${id}/delete/`
      method = 'DELETE'
    }
    const url = `${process.env.REACT_APP_API_URL_BASE}/${endpoint}`;
    setLoadingAcept(true);
    setDisabledAcept(true)
    await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token?.access,
      },
      body: (action==='edit') ? JSON.stringify(body) : "",
    }).then((res) => {
        if (res.json().code === "token_not_valid") {
          logoutUser();
        }else if(res.ok){
          //crear la notificacion confirma la eliminacion
          setLoadingAcept(false);
          setOpenDialog(false);
          let text = action==="edit" ? "Your data has been successfully updated": "Your data has been deleted."
          setNotification(prev=>({...prev,open:true, text:text}))
          setTextDialog({title:"Confirm!", content:"You are sure make this?"})
          getData()

        }
      })

  };

  const NotificationClose = (e) => {
    setNotification((prev)=>({...prev, open:false}));
  };

  const ContentDialogEdit = ({search, description})=>{
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

  const clickEdit = (event, cellValues) => {
    
    setTextDialog(prev=>({...prev,title:"Edit Search",content: <ContentDialogEdit search={cellValues.row.search} description={cellValues.row.description}/> }))
    setActionButtons({action:"edit",values:cellValues})

    setDisabledAcept(false)
    setOpenDialog(true);

  };

  const clickDelete = (event,cellValues)=>{
    setActionButtons({action:"delete",values:cellValues})
    setTextDialog((prev)=>({...prev,title:"Delete Record",content:'Are you sure you want to delete this record?'}))
    setDisabledAcept(false)

    setOpenDialog(true)
  }


  const optionsButtons = (cellValues) => {
    return (
      <>
        <Tooltip
          title="Edit"
          onClick={(event) => {
            clickEdit(event, cellValues);
          }}
        >
          <IconButton
            style={{ marginRight: "2px" }}
            aria-label="edit"
            color="warning"
          >
            <ModeEditOutlineOutlinedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip
          title="Delete"
          onClick={(event) => {
            clickDelete(event, cellValues);
          }}
        >
          <IconButton aria-label="delete" color="error">
            <DeleteOutlinedIcon />
          </IconButton>
        </Tooltip>
      </>
    );
  };


  const rows = data.map((obj) => ({
    id: obj.id,
    user: obj.user.user_name,
    email: obj.user.email,
    search: obj.search_title,
    company: obj.company,
    mont_page: obj.mont_page,
    create_date: new Date(obj.create_date).toDateString(),
    description: obj.description || "without description",
  }));
  
  let columns = [
    { field: "search", headerName: "Search", minWidth: 210,flex:1 },
    { field: "user", headerName: "User Name", minWidth: 150,flex:1 },
    { field: "email", headerName: "Email", minWidth: 150,flex:1 },
    { field: "company", headerName: "Company",description:"Company Search", minWidth: 150,flex:1 },
    { field: "mont_page", headerName: "Mont Page", description:"Mont page in paginator",minWidth: 150,flex:1 },
    { field: "create_date", headerName: "Date created", width: 150 },
    { field: "description", headerName: "Description", minWidth: 170,flex:1 },
    { field: "options", headerName: "Options", minWidth: 100,flex:1, renderCell: optionsButtons, disableClickEventBubbling: true,},
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
        disabledAcept={disabledAcept}
        setDisabledAcept={setDisabledAcept}
      />
      <NotificationSnackBars {...notification} onClose={NotificationClose}  />
    </div>
  );
};

export default DataGridSearch;
