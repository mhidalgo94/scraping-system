import CircularProgress from '@mui/material/CircularProgress';



const Body = ({children, loading=false}) =>{
    return (
        <div className="content-body">
            {loading ? (<span className='loading-circular-progress'><CircularProgress /></span>) : children }
        </div>
    )
}

export default Body;