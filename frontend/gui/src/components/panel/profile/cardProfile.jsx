import {useRef, useState} from 'react'
import Container from '@mui/material/Container';
import AddAPhotoOutlinedIcon from '@mui/icons-material/AddAPhotoOutlined';
import Switch from '@mui/material/Switch';
import './cardprofile.css';
import useAuth from "../../../utils/useAuth";

function CardProfile({img,is_active,enable_notific,staff, setUserData}){
    const hiddenImgInput  = useRef(null)
    const [urlImg, setUrlImg] = useState(img)
    const {user} = useAuth();

    const handleToggleActive = (e)=>{
        setUserData(prev=>({...prev,[e.target.name]:e.target.checked}))
    }

    const handleUploadImg = ()=>{
        hiddenImgInput.current.click();

    }

    const handleFileSelect = (event)=>{
        const fileUploaded = event.target.files[0];
        setUserData(prev=>({...prev,[event.target.name]:fileUploaded}))
        setUrlImg(URL.createObjectURL(fileUploaded))
    }
    return (
        <Container maxWidth="sm" className="container-card-profile" >
            <div className='container-img'>
                <div className='container-photo' onClick={handleUploadImg}>
                    <input ref={hiddenImgInput} name="img" onChange={handleFileSelect} className="input-img-profile" accept='image/*' type='file' tabIndex="-1" style={{display:"none"}}/>
                    <span className="support-img">
                        <img className="img-profile-card" alt="imagen" src={urlImg || '/images/default-image-avatar.jpg'}/>
                    </span>
                    <span className='icon-with-text'>
                        <AddAPhotoOutlinedIcon />
                        <p>Updated Foto</p>
                    </span>
                </div>
                <span class="info-text">Allowed *.jpeg, *.jpg, *.png, *.gif <br /> max size of 3.1 MB</span>
                
            </div>
            <div className="profile-status">
                <div>
                    <h3>Activate User</h3>
                    <p>Apply disabled account</p>
                </div>
                <Switch color="success" checked={is_active} onClick={handleToggleActive}  name="is_active"/>
            </div>
            <div className="profile-status">
                <div>
                    <h3>Enable Notifications</h3>
                    <p>Apply notifications with email</p>
                </div>
                <Switch color="success" checked={enable_notific} onClick={handleToggleActive}  name="enable_notific"/>
            </div>
            {user.mang &&
                (<div className="profile-status">
                    <div>
                        <h3>Permission manager</h3>
                        <p>Get more privileges</p>
                    </div>
                    <Switch color="success" checked={staff} onClick={handleToggleActive}  name="staff" />
                </div>)
            }
        </Container>
    )
}


export default CardProfile;