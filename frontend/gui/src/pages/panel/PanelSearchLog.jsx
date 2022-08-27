import PanelPage from "./PanelPage";
import DataGridSearchLog from '../../components/panel/table/articles/DataGridSearchLog'

function PanelSearchLog(){
  return (
    <PanelPage title="Search Logs">
        <DataGridSearchLog />
    </PanelPage>
  );
};

export default PanelSearchLog;
