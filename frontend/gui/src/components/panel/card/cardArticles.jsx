import {useState} from 'react';
import axios from 'axios';
import CheckedComponent from "../../checked/checkedComponent";
import {useParams} from 'react-router-dom';
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Rating from "@mui/material/Rating";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import useAuth from "../../../utils/useAuth";

import DialogConfirm from '../../dialog/dialogconfirm';
import NotificationSnackBars from '../../notification/Notification';



const ButtonsFavorite = ({ validate = false, checked, values, callBack }) => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  return (
    <Tooltip title="Add favorite">
      <CheckedComponent
        validate={validate}
        {...label}
        checked={checked}
        icon={<FavoriteBorder color="warining" />}
        checkedIcon={<Favorite color="warning" />}
        values={values}
        callBack={callBack}
      />
    </Tooltip>
  );
};

const CardArticles = ({ title, img, urlPage, price, oldPrice, rate,favorite, id,getData }) => {
    const {logoutUser} = useAuth()
    const token = JSON.parse(localStorage.getItem("authTokens", null));
    const headers = {
        Authorization: "Bearer " + token?.access,
      }
    const {company} = useParams()
    const rateValue = rate ? rate.slice(0, 3) : 0; 

    // state for Dialog confirm
    const [openDialog, setOpenDialog] = useState(false)
    const [textDialog,setTextDialog] = useState({title:"",content:""})
    const [loadingAcept, setLoadingAcept] = useState(false)

    // State for component notification
    const [notification, setNotification] = useState({open:false,text:"",horizontal:"center"})

    const NotificationClose = (e) => {
      setNotification((prev)=>({...prev, open:false}));
    };
    const onAcept =()=>{
      setLoadingAcept(true)
      const endpoint = `api/${company}/${id}/delete/`
      const url = `${process.env.REACT_APP_API_URL_BASE}/${endpoint}`;
      axios.delete(url,{headers}).then(res=>{
        let text = 'Your item has been successfully deleted';
        setNotification(prev=>({...prev,open:true, text,severity:'success'}));
        setLoadingAcept(false);
        setOpenDialog(false);
        setTimeout(()=> getData(),2000);
  
      }).catch(err=>{
        if (err.response.statusText==='Unauthorized'){
          logoutUser();
        }
        setOpenDialog(false)
        setLoadingAcept(false);
  
        setNotification(prev=>({...prev,open:true, text:err.message,severity:'error'}));
      })
        
    }

    const deleteArticle = ()=>{
        setTextDialog(prev=> ({title:"Delete Article", content:`You want delete '${title}'?`}))
        setLoadingAcept(false)
        setOpenDialog(true)

    }

    const editFavorite = async (event)=>{

        let body = {product:title,img,url_product:urlPage,price,old_price:oldPrice,favorite:event.target.checked};
        const endpoint = `api/${company}/${id}/update/`
        const url = `${process.env.REACT_APP_API_URL_BASE}/${endpoint}`;
        
        const validateChecked = await axios.put(url,body,{headers}).then(res=>{
            let text = `Your article has been ${!event.target.checked ? 'added ' : 'removed '} favorite`
            setNotification(prev=>({...prev,open:true, text,severity:'success'}))
            return true;
        }).catch(err=>{
            if (err.response.statusText==='Unauthorized'){
                logoutUser();
            }
            setNotification(prev=>({...prev,open:true, text:err.message,severity:'error'}));
            return false
    })
    return validateChecked
  }


  return (
    <>
    <div className="card">
      <div className="card-head">
        <img alt={title} src={img} className="card-img" />
      </div>
      <div className="card-content">
        <a href={urlPage} className="link-card-content">
          <h6 className="title-card-content">{`${title.slice(0,30)}...`}</h6>
        </a>
        <div className="footer-card-content">
          <span className="fav-card-content" style={{alignItems:'none'}}>
            <Stack direction="row" spacrcing={2}>
              <Rating readOnly name="rating" value={rateValue} />
            </Stack>
          </span>
          <div className="footer-card-content-options">
            <span className="fav-card-content" style={{display:"flex"}}>
              <Stack direction="row" spacing={2}>
                <ButtonsFavorite validate={true} checked={favorite} size="small" callBack={(event)=> editFavorite(event)}/>

                <Tooltip title="Delete Article">
                    <IconButton size="small" style={{marginLeft:'0px'}} onClick={deleteArticle}>
                        <DeleteOutlinedIcon color="error" />
                    </IconButton>
                </Tooltip>
              </Stack>
            </span>
            <del className="old-price-card-content">
              {oldPrice ? `$${oldPrice}` : ""}
            </del>
            <span className="price-card-content">${price}</span>
          </div>
        </div>
      </div>
    </div>
    <DialogConfirm
        fullWidth={true}
        maxWidth='sm'
        open={openDialog}
        setOpen={setOpenDialog}
        onAcept={onAcept}
        title={textDialog.title}
        content={textDialog.content}
        loadingAcept={loadingAcept}
        />
    <NotificationSnackBars {...notification} onClose={NotificationClose}  />
    </>
  );
};

export default CardArticles;
