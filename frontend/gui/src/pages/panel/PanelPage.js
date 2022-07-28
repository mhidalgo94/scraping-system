import Panel from "../../components/panel/Panel";

const PanelPage = ({children,...rest}) => {
  return <Panel {...rest}>{children}</Panel>;
};

export default PanelPage;
