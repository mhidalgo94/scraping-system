import React from 'react';
import TitleHead from './TitleHead'
import Body from './Body'
import './content.css';


const Content = ({children, title}) =>{
    return(
        <div>
            <TitleHead title={title} />
            <Body >
                {children}
            </Body>
        </div>
    )

}
export default Content;