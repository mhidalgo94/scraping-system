import React from "react";
import TopBar from './topbar/TopBar';
import SideLeftBar from './sidebar/SideLeftBar';
import Content from './content/Content';
import './panel.css'

const Panel = ({children,...rest}) => {
  return (
    <>
      <TopBar  />
      <div className="container">
        <SideLeftBar />
        <div className="content-container">
          <div className="content-center">
            <Content {...rest}>{children}</Content>
          </div>
        </div>
      </div>
    </>
  );
};

export default Panel;
