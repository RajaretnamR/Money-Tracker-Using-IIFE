// https://689d9205ce755fe697890bfb.mockapi.io/user


class EasyHTTP {

    // First Make a GET Request :
    get(url){
        return new Promise((resolve , reject)=>{
            fetch(url)
            .then(res=>res.json())
            .then(data=>resolve(data))
            .catch(err =>reject("Sry macha edo thappa iruku da !???"))
        })
    }
    
    // Second make a POST Request :
    post(url , data ){
        return new Promise((resolve, reject) =>{
            fetch(url,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
            })
            .then(res=>res.json())
            .then(data=>resolve(data))
            .catch(err =>reject("Sry macha edo thappa iruku da !???"))
        })
    }


    // Third make a PUT Request :
    put(url , data ){
        return new Promise((resolve, reject) =>{
            fetch(url,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
            })
            .then(res=>res.json())
            .then(data=>resolve(data))
            .catch(err =>reject("Sry macha edo thappa iruku da !???"))
        })
    }
    
    // Fourth make a DELETE Request :
    delete(url){
        return new Promise((resolve, reject) =>{
            fetch(url,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                }//,
                // body:JSON.stringify(data)
            })
            .then(res=>res.json())
            .then(data=>resolve("Perfect ah unoda Resources ha delete panite da "))
            .catch(err =>reject("Sry macha edo thappa iruku da !???"))
        })
    }
}
   
