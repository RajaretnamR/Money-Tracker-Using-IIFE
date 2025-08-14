

const http = new EasyHTTP();

// Step -1 To make a "GET" request from Server Using Async() & Await() :

http.get("https://689d9205ce755fe697890bfb.mockapi.io/user")
.then(data=>console.log(data))
.catch(err=> console.log(err));


const data = {
    // name : " Raja retnam"
    name : "The Future Web Developer"
}

// Step -2 To make a "POST" request from Server Using Async() & Await() :
http.post("https://689d9205ce755fe697890bfb.mockapi.io/user" , data )
.then(data=> console.log(data))
.catch(err=>console.log(err));



// Step -3 To make a "PUT" request from Server Using Async() & Await() :
http.put("https://689d9205ce755fe697890bfb.mockapi.io/user/1" , data )
.then(data=> console.log(data))
.catch(err=>console.log(err));



// Step -4 To make a "DELETE" request from Server Using Async() & Await() :
http.delete("https://689d9205ce755fe697890bfb.mockapi.io/user/1" , data )
.then(data=> console.log(data))
.catch(err=>console.log(err));