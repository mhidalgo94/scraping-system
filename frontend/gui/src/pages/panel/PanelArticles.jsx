import { useParams } from 'react-router-dom';
import PanelPage from "./PanelPage";
import TabsArticles from "../../components/panel/tabs/articles/TabsArticles"

function PanelHome(){

  const {company} = useParams()
  return (
    <PanelPage title={`Articles  ${company.toString().toUpperCase()}`}>
      <TabsArticles style={{padding:"0px"}}/>
    </PanelPage>
  );
};

export default PanelHome;
