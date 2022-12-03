
const TitleHead = ({title,BtnTitle})=>{
    return(
        <div className='content-head' style={{marginTop:"20px"}}>
            <h4 className="content-title" style={{fontSize:"1.5rem",color:'rgb(133, 141, 150)'}}>{title}</h4>
            {BtnTitle}
        </div>
    )
}

export default TitleHead;