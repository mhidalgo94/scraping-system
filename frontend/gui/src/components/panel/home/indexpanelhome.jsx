import React from "react";
import TopBar from '../topbar/TopBar';
import SideLeftBar from '../sidebar/SideLeftBar';
import HomePanel from './homepanel'
import '../panel.css'

const IndexPanelHome = ({children,...rest}) => {
  return (
    <>
      <TopBar  />
      <div className="container">
        <SideLeftBar />
        <div className="content-container">
          <div className="content-center" style={{width:'95%'}}>
            <HomePanel />
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexPanelHome;
