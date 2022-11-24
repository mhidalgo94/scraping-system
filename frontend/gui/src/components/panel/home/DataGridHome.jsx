import { DataGrid} from "@mui/x-data-grid";
import Chip from '@mui/material/Chip';


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


const DataGridTaskScheduled = ({data=[],loading})=>{

  const rows = data.map((obj) =>({
    id: obj.id,
    search: obj.search_title,
    desc: obj.description,
    company : obj.company,
    status : obj.status_task,
    create : (new Date(obj.create_date)).toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " "),
  }));
  
  let columns = [
    { field: "id", hide: true,headerClassName: 'header-bg' },
    { field: "search", headerName: "Search", minWidth: 50 ,flex:1,headerClassName: 'header-bg'},
    { field: "desc", headerName: "Description", minWidth: 50 ,flex:1,headerClassName: 'header-bg'},
    { field: "company", headerName: "Company", minWidth: 50 ,flex:1,headerClassName: 'header-bg'},
    { field: "status", headerName: "Status", minWidth: 50 ,flex:1,headerClassName: 'header-bg',renderCell: StatusRow},
    { field: "create",type:"dateTime", headerName: "Date Create",minWidth: 50 ,flex:1,headerClassName: 'header-bg'},
  ];

    return (
        <div style={{ height: 576, width: "100%"}}>
          <DataGrid
            rows={rows}
            columns={columns}
            loading={loading}
            pageSize={10}
            disableSelectionOnClick
            rowsPerPageOptions={[30]}
            hideFooter
            sx={{
                border:0,
                borderColor:'white',
                '& .header-bg': {background:'rgb(245, 245, 245)'},
            }}
          />
        </div>
      );
}

export default DataGridTaskScheduled;