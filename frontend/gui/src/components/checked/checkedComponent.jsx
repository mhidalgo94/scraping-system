import {useState} from 'react'
import Checkbox from '@mui/material/Checkbox';




const CheckedComponent = ({icon, checkedIcon,checked, callBack, values,validate=false, ...rest})=>{
    const [defaultChecked, setDefaultChecked] = useState(checked);

    // validate is for need verficate checked, if need callBack need return Boolean. Default is False
    // callBack will execute if is checked
    const handleChange = async (event,values)=>{
        if (validate){
            const val = await callBack(event,values);
            if (val){
                setDefaultChecked(!defaultChecked);
            }

        }else{
            callBack(event,values);
        }
        
    }

    return (
        <Checkbox {...rest} checked={defaultChecked}  icon={icon} checkedIcon={checkedIcon} onChange={(e)=>handleChange(e,values)} />
    )


}


export default CheckedComponent;

