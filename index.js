const express=require("express");
const app=express();
const port=3000;
const path=require("path");
app.set("view engine","ejs");
const methodOverride=require("method-override");
app.use(methodOverride("_method"));
app.set("views",path.join(__dirname,"views"));
const mongoose=require("mongoose");
const Chat=require("./models/chat");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}
main()
.then((res)=>{
    console.log("connection successful");
})
.catch((err)=>{
    console.log(err);
});

let chat1=new Chat({
    from:"pranshu",
    to:"rahul",
    msg:"kya haal hain bhai",
    created_at:new Date()
});
// chat1.save();//ek baar kr diya tha toh uske baad jitni baar bhi run kr raha tha utni baar add hoye jaa raha tha
// .then((res)=>{
//     console.log(res);
// });


app.get("/",(req,res)=>{
    res.send("thanku for visiting this site");
})
//delete or destroy route
app.delete("/chats/:id",async (req,res)=>{
    let {id}=req.params;
    await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
})

//index route
app.get("/chats",async (req,res)=>{
    let chats= await Chat.find()
    console.log(chats);
    res.render("index.ejs",{chats});
})

//new chat route
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/chats",(req,res)=>{
    let {from,to,msg}=req.body;
    let newChat=new Chat({
        from:from,
        to:to,
        msg:msg,
        created_at:new Date()
    });
    newChat.save();
    res.redirect("/chats");
})

//update route
app.get("/chats/:id/edit",async (req,res)=>{
    let {id}=req.params;
    let chat=await Chat.findById(id);
    res.render("edit.ejs",{chat});
})
//update route
app.put("/chats/:id",async (req,res)=>{
    let {id}=req.params;
    let {msg:newMsg}=req.body;
    let updatedChat=await Chat.findByIdAndUpdate(id,{msg:newMsg},{runValidators:true,new:true});
    res.redirect("/chats");
})


app.listen(port,()=>{
    console.log("port is listening");
})