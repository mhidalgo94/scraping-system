import PanelPage from "./PanelPage";
import DataGridSearchLog from '../../components/panel/table/DataGridSearchLog'

function PanelHome(){
  return (
    <PanelPage title="Search Logs">
        <DataGridSearchLog />
    </PanelPage>
  );
};

export default PanelHome;
