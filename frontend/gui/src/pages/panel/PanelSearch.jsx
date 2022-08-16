import PanelPage from "./PanelPage";
import DataGridSearch from '../../components/panel/table/DataGridSearch'
import Button from '@mui/material/Button';

const click=()=>{
  console.log('click boton head')
}


const BtnTitle =()=>{
  return (
    <div>
      <Button variant="contained" style={{marginRight:"4px",boxShadow: "rgb(32 101 209 / 24%) 0px 8px 16px 0px",borderRadius:"8px"}} onClick={click}>Contained</Button>
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
