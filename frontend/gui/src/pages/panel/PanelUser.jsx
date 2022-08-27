import PanelPage from "./PanelPage";
import TabsUsers from "../../components/panel/tabs/users/TabsUsers"



function PanelUsers(){

  return (
    <PanelPage title='Users'>
      <TabsUsers style={{padding:"0px"}}/>
    </PanelPage>
  );
};

export default PanelUsers;
