import { useState, useEffect } from "react";
import {useParams} from 'react-router-dom';
import axios from 'axios';
import useAuth from "../../../utils/useAuth";
import CardArticles from './cardArticles'
import NotificationSnackBars from '../../notification/Notification'
import SkeletonCard from './skeletonCard'
import './cardarticles.css'
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


const ContainerCard = ()=>{
    const {logoutUser} = useAuth()
    const [data, setData] = useState(null)
    const {searchId,company} = useParams()
    const token = JSON.parse(localStorage.getItem("authTokens", null));
    const endpoint = `api/list/${company}/search/${searchId}/`;
    let url = `${process.env.REACT_APP_API_URL_BASE}/${endpoint}`;

    let headers = {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token?.access,
      }
    // Pagination
    const pageSize = 20;
    const [pagination, setPagination] = useState({count:0,numPage:1,prevPage:null, nextPage:null})

    // State for component notification
    const [notification, setNotification] = useState({open:false,text:"",horizontal:"center"})
    const NotificationClose = (e) => {
      setNotification((prev)=>({...prev, open:false}));
    };

    const getData = (page=false) => {
      let url_ = page ||  `${process.env.REACT_APP_API_URL_BASE}/${endpoint}`;
      setData(null) 
      axios.get(url_,{headers}).then(res=>{
          setData(res.data);
          setPagination({...pagination, count:res.data.count, prevPage:res.data.previous, nextPage:res.data.next});
        }).catch(err=>{
          if (err.response.statusText==='Unauthorized'){
            logoutUser();
          }
          setNotification( prev=>({...prev,open:true,text:err.message,severity:"error"}));
          
        });

    };

    const handlePaginator = (event,p)=>{
      let {numPage,prevPage,nextPage} = pagination
      if (numPage < p){
        getData(nextPage);
        setPagination({...pagination,numPage:p });
      }else{
        getData(prevPage);
        setPagination({...pagination,numPage:p });

      }
    }

    useEffect(()=>{

      axios.get(url,{headers}).then(res=>{
        setData(res.data);
        setPagination({...pagination, count:res.data.count, prevPage:res.data.previous, nextPage:res.data.next});
      }).catch(err=>{
        if (err.response.statusText==='Unauthorized'){
          logoutUser();
        }
        setNotification( prev=>({...prev,open:true,text:err.message,severity:"error"}));
        
      });
    // eslint-disable-next-line
    },[]);

    return (
      <>
        <Grid container spacing={2} style={{padding:'30px', marginBottom:"10px"}}>
            {data ? (data.results.map(obj=>{
                return (
                <Grid item xs={3} key={obj.id}>
                    <CardArticles getData={getData} title={obj.product} img={obj.img} urlPage={obj.url_product} price={obj.price} oldPrice={obj.old_price} id={obj.id}  rate={obj.rate} favorite={obj.favorite}/>
                </Grid>
                )
            })) :   <>{[...Array(8)].map(()=> <SkeletonCard />)}</> 
          }

        </Grid>
        <Stack spacing={2} >
          <Pagination style={{margin:"15px auto"}} onChange={handlePaginator} count={Math.ceil(pagination.count / pageSize)} variant="outlined" color="primary" />
        </Stack>
        <NotificationSnackBars {...notification} onClose={NotificationClose}  />
        </>
    )
}

export default ContainerCard