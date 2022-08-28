import PanelPage from "./PanelPage";
import DataGridSearch from '../../components/panel/table/articles/DataGridSearch';
import Button from '@mui/material/Button';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import {useNavigate} from 'react-router-dom'


const BtnTitle =()=>{
  const navigate = useNavigate();
  return (
    <div>
      <Button startIcon={<AddOutlinedIcon />} onClick={()=>navigate('/dashboart/search-articles')}id="btn-success">New Search</Button>
    </div>
  )
}
/// Asi esta bien solo tienes que crear la clase para los botones

const PanelSearch = () =>{
 

  return (
    <PanelPage title="Searches" BtnTitle={<BtnTitle />}>
      <DataGridSearch />
    </PanelPage>
  );
};

export default PanelSearch;
