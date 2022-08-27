import PanelPage from "./PanelPage";
import DataGridSearchLogAll from '../../components/panel/table/articles/DataGridSearchLogAll'

function PanelSearchLogsAll(){
  return (
    <PanelPage title="Search Logs">
        <DataGridSearchLogAll />
    </PanelPage>
  );
};

export default PanelSearchLogsAll;
