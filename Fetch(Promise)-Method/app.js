

const http = new EasyHTTP();

//This is For GET Request From the server :
http.get("https://689d9205ce755fe697890bfb.mockapi.io/user")
.then(data=>console.log(data))
.catch(err=> console.log(err));

const data ={
    // name : "Raja retnam "
    name :"Appu developer "
};

//This is For POST Request From the server :
http.post("https://689d9205ce755fe697890bfb.mockapi.io/user" , data )
.then(data=>console.log(data))
.catch(err=> console.log(err));


//This is For PUT Request From the server :
http.put("https://689d9205ce755fe697890bfb.mockapi.io/user/21" , data )
.then(data=>console.log(data))
.catch(err=> console.log(err));

//This is For DELETE Request From the server :
http.delete("https://689d9205ce755fe697890bfb.mockapi.io/user/5" , data )
.then(data=>console.log(data))
.catch(err=> console.log(err));