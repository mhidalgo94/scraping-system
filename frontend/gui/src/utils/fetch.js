const baseURL = process.env.REACT_APP_API_URL_BASE

export const fetchwithOutToken = async (endpoint, data, method = 'GET') =>{
    const url = `${baseURL}/${endpoint}`;

    if (method==='GET'){
        return  await fetch(url);
    }else{
        return  await fetch(url,{
            method:method,
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        }).catch(err=>{
            return err;
        });
    }
}

export const fetchwithToken = async (endpoint, data, method = 'GET') =>{
    const url = `${baseURL}/${endpoint}`;

    const token = JSON.parse(localStorage.getItem('authTokens',null));
    
    const res = await fetch(url,{
        method:method,
        headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ token.access
        }
    }).catch(err=>{
        return err
    });
    if(res.status===200){
        
        let data = await res.json();
        return data
    }
    return await res;

}




export const fetchRefreshToken = async (endpoint, method = 'GET') =>{
    const url = `${baseURL}/${endpoint}`;
    let data = JSON.parse(localStorage.getItem('authTokens'))
    if (method==='GET'){
        return  await fetch(url);
    }else{
        return  await fetch(url,{
            method:method,
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({"refresh": String(data?.refresh)})
        }).catch(err=>{
            return err;
        });
    }
}
