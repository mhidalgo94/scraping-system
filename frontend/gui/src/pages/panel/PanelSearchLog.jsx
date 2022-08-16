import PanelPage from "./PanelPage";
import DataGridSearchLog from '../../components/panel/table/DataGridSearchLog'

function PanelSearchLog(){
  return (
    <PanelPage title="Search Logs">
        <DataGridSearchLog />
    </PanelPage>
  );
};

export default PanelSearchLog;
