import React from "react";
import TopBar from './topbar/TopBar'
import SideLeftBar from './sidebar/SideLeftBar'
import Content from './content/Content'

const Panel = ({children,...rest}) => {
  return (
    <>
      <TopBar />
      <div className="container" >
        <SideLeftBar />
        <div className="content-container">
          <Content {...rest}>
              {children}
          </Content>
        </div>
      </div>
    </>
  );
};

export default Panel;
