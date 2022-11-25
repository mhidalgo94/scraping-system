import PanelPage from "./PanelPage";
import DataGridSearchAll from '../../components/panel/table/articles/DataGridSearchAll';
import Button from '@mui/material/Button';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import {useNavigate} from 'react-router-dom'


const BtnTitle =()=>{
  const navigate = useNavigate();
  return (
    <div>
      <Button startIcon={<AddOutlinedIcon />} onClick={()=>navigate('/dashboart/start-search')} style={{marginRight:'5px'}} id="btn-success">New Search</Button>
    </div>
  )
}

const PanelSearchAll = () =>{
 

  return (
    <PanelPage title="All Searches" BtnTitle={<BtnTitle />}>
      <DataGridSearchAll />
    </PanelPage>
  );
};

export default PanelSearchAll;
