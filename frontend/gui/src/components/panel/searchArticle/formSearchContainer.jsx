import SearchArticle from './formSearch'
import SheduleSearch from './formSearchShedule'
import Divider from '@mui/material/Divider';


function SearchContainer(){


    return (
        <>
        <SearchArticle />
        <Divider style={{margin:'22px 25px'}}/>
        <SheduleSearch />
        </>

    )
}

export default SearchContainer;