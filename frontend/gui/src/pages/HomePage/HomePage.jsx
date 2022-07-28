import {Link} from 'react-router-dom'


const HomePage = ()=>{
    return (
        <>
            <Link to='/login'><h3>Login</h3></Link>
            <Link to='/'><h3>Home</h3></Link>
            <Link to='/dashboart/home'><h3>Dashboart</h3></Link>
        
        </>



    )
}

export default HomePage;