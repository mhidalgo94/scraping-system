import {Outlet, Navigate ,useLocation} from 'react-router-dom'
import useAuth from '../../utils/useAuth'

const PrivateRoute = ()=>{
    const {user} = useAuth()
    const location = useLocation();


    return (
        <>
            {user ? <Outlet /> : <Navigate to="/login" state={{from:location}} replace/>}
        </>
    )

}

export default PrivateRoute;
