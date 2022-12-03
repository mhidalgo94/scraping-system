import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Legend } from 'recharts/es6';
import {Typography} from '@mui/material'

function GraficPieHome({allData}){
    const [data, setData] = useState([]);

    const  handleGrafic = ()=>{
        let list = []
        const reduce = allData.map((obj) =>({
            id: obj.id,
            status : obj.status_task,
        })).reduce((a,d) => (a[d.status] ? {...a,[d.status]: a[d.status]+1} : {...a,[d.status]: 1}),{});
        
        let keys = Object.keys(reduce)
        for(let m=0; m < keys.length;m++){
            list.push({id:m,name:keys[m], value:reduce[keys[m]]})
        }
        setData(list);
    }

    useEffect(()=>{
        handleGrafic()

    // eslint-disable-next-line
    },[allData])


    const COLORS = {'SUCCESS':'#00C49F',
                    'PENDING':'#FFBB28',
                    'REVOKED':'#9575CD',
                    'FAILURE':'#D32F2F'
                };
    return (
        <div style={{display:'grid', justifyContent:'center'}}>
            {data.length ? (
            <PieChart width={400} height={400}>
                <Pie data={data} cx="50%" cy="50%" nameKey="name" dataKey="value" legendType="circle">
                    {data.map((entry, index) => {
                        return (
                        <>
                            <Cell key={`cell-${entry.id}`} fill={COLORS[entry.name]} />
                        </>
                    )})}
                </Pie>
                <Legend layout="horizontal" verticalAlign="bottom" align="center" />
            </PieChart>) 
            :
            <Typography  variant='subtitle1' >No registered searches..</Typography>
            }
        </div>
        
    )
}

export default GraficPieHome;