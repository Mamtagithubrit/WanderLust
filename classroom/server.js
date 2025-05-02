const express=require("express");
const app=express();
const users=require("./routes/user.js");
const posts=require("./routes/post.js")
const session=require("express-session");
const flash=require("connect-flash");
const path=require("path");
const ejsMate = require('ejs-mate');

app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));



const sessionOptions={
    secret:"mysupersecretstring",
    resave:false,
    saveUninitialized:true,
}

app.use(session(sessionOptions ));
app.use(flash());
app.get("/register",(req,res)=>{
    let {name="anonymous"}=req.query;
    req.session.name=name;
    req.flash("success","user registered successfully!");
    res.redirect("/hello");
})
app.get("/hello",(req,res)=>{
    console.log(req.session.name);
    res.render("page.ejs",{name: req.session.name, msg: req.flash("success")});
})



app.get("/reqcount",(req,res)=>{
    if(req.session.count){
        req.session.count++;
    }
    else{
        req.session.count=1;
    }
    
    res.send(`You sent a request ${req.session.count} times`);
})


app.listen(3000,()=>{
    console.log("server is listening to 3000");
})











app.use("/users",users); //jin bhi route ki request /users pr aayegi unki mapping users file m krni h
app.use("/posts",posts);



