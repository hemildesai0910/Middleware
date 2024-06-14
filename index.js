const express=require ("express");
const app=express();
const ExpressError=require('./ExpressError')

// app.use((req,res,next)=>{
//     console.log("Hi,I am a 1 middleware !")
//     // next();
//     return next();
//     // console.log("this is after next()")
// })

// app.use((req,res,next)=>{
//     console.log("Hi,I am a 2 middleware !")
//     next();
// })

// app.use((req,res,next)=>{
//     req.time=new Date(Date.now()).toString();  
//     console.log(req.method,req.hostname,req.time);
//     next();
// })

// app.use("/random",(reu,res)=>{
//     console.log("I am only for random")
//     next();
// })
// app.use("/api",(req,res,next)=>{
//     let {token}=req.query
//     if(token==="giveaccess"){
//         next();
//     }else{
//         res.send("ACCESS DENIED:")
//     }

// })
 
// app.get("/api",(req,res)=>{
//     res.send("data")
// })

//middleware as a function
const checkToken=(req,res,next)=>{
    let {token}=req.query
    if(token==="giveaccess"){
        next();
    }
    throw new ExpressError(401,"ACCESS DENIED!")


}
 
app.get("/api",checkToken,(req,res)=>{
    res.send("data")
})

//error handling middle ware
app.get("/err",(req,res)=>{
    abcd=abcd;
})

app.use((err,req,res,next)=>{
    // console.log("----------ERROR 1--------")
    // next(err);
    let {status=500,message="Some error"} = err;
    res.status(status).send(message )
    //res.send(err); 
})

// app.use((err,req,res,next)=>{
//     console.log("----------ERROR 2--------")
//     next(err); 
// })

app.use((req,res)=>{
    res.status(404).send("Page not found!")
})

app.get("/",(req,res)=>{
    res.send("Hi I am a root")
    
})

app.get("/random",(req,res)=>{
    res.send("This is a random Page")
})

app.listen(8080,()=>{
    console.log("server listening to port 8080")
})