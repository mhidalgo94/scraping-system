import React from 'react';
import TitleHead from './TitleHead'
import Body from './Body'
import './content.css';


const Content = ({children, title,btnTitle,...rest}) =>{
    return(
        <>
            <TitleHead title={title} btnTitle={btnTitle} {...rest}/>
            <Body {...rest}>
                {children}
            </Body>
        </>
    )

}
export default Content;