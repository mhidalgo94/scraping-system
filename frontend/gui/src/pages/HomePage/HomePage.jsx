import {Link} from 'react-router-dom'
import './homepage.css'


const HomePage = ()=>{
    return (
        <div id="initial-page" >
            <div id='into-initial'>
                <div style={{display:'grid', justifyContent:'center', textAlign:'center'}}>
                    <h1 id="title-home">Project based on Web Scraping </h1>
                    <h2 id='parag'>"You want to waste less time in your favorite stores scheduling searches."</h2>
                    <Link to="/login" id='btn-login-home'>Lest's Go.</Link>
                </div>
            </div>

        </div>



    )
}

export default HomePage;