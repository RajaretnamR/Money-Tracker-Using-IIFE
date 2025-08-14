


// URL = "https://689d9205ce755fe697890bfb.mockapi.io/user"
class EasyHTTP{
    
    // Step -1 To make a "GET" request from Server Using Async() & Await() :
    
    async get(url){
        const response = await fetch(url); // Idhu enna solum na = ni wait panu avan response eduthutu vaara varikum 
        const resData = await response.json(); // = ni wait panu avan response ah JSON ah mathura varaikum 
        
        return resData;  // and last it will give a response data 
    }

    // Step -2 To make a "POST" request from Server Using Async() & Await() :

    async post(url , data){
        const response = await fetch(url, {
            method : "POST" ,
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        });
        const resData = await response.json();

        return resData
        
    }

    // Step -3 To make a "PUT" request from Server Using Async() & Await() :
    async put(url , data){
        const response = await fetch(url, {
            method: "PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(data)
        });
        const resData = await response.json();
        return resData;
        
    }


    // Step -4 To make a "DELETE" request from Server Using Async() & Await() :
    async delete(url){
        const response = await fetch(url, {
            method: "DELETE",
            headers:{
                "Content-Type":"application/json"
            },
        });
        const resData = await response.json();
        return resData;

    }




}
