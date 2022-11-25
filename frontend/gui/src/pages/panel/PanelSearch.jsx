import PanelPage from "./PanelPage";
import DataGridSearch from '../../components/panel/table/articles/DataGridSearch';
import Button from '@mui/material/Button';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';

import {useNavigate} from 'react-router-dom'


const BtnTitle =()=>{
  const navigate = useNavigate();
  return (
    <div>
      <Button startIcon={<AddOutlinedIcon />} onClick={()=>navigate('/dashboart/start-search')} style={{marginRight:'5px'}} id="btn-success">New Search</Button>
      <Button startIcon={<OpenInBrowserIcon />} onClick={()=>navigate('/dashboart/search/all')} id="btn-warning">All Task</Button>
    </div>
  )
}
/// Asi esta bien solo tienes que crear la clase para los botones

const PanelSearch = () =>{
 

  return (
    <PanelPage title="Completed searches" BtnTitle={<BtnTitle />}>
      <DataGridSearch />
    </PanelPage>
  );
};

export default PanelSearch;
