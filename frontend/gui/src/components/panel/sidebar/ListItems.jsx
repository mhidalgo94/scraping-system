// import {useEffect} from 'react'
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from '../../../utils/useAuth'


const ListItems = ({text,to,icons}) => {
    const {logoutUser} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [active, setActive] = useState(false)
    const className = active ? 'active' : "";

    const To = ()=>{
        if(to==='/logout'){
            logoutUser()
        }else{
            navigate(to)
        }
    }
    
    useEffect(()=>{
        if(to === location.pathname){
            setActive(true)
        }
        // eslint-disable-next-line
    },[])


  return (
    <li className={"sidebar-list-items "+className} onClick={To} >
         {icons}
        <span className="sidebar-list-items-title">{text}</span>
    </li>
  );
};


export default ListItems;