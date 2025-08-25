const mongoose=require("mongoose");
const Chat=require("./models/chat");
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

Chat.insertMany([
    {
        from:"pranshu",
        to:"rahul",
        msg:"kya haal hain bhai",
        created_at:new Date()
    },
    {
        from:"pranshu",
        to:"mukul",
        msg:"college mein swagat hai",
        created_at:new Date()
    },
    {
        from:"mukul",
        to:"shubh",
        msg:"bhai chal chale",
        created_at:new Date()
    },
    {
        from:"laksh",
        to:"tyagi",
        msg:"in college?",
        created_at:new Date()
    },
    {
        from:"pranshu",
        to:"tyagi",
        msg:"pass bhej illusion ka",
        created_at:new Date()
    },
    {
        from:"pranshu",
        to:"sparsh",
        msg:"baat krle usse tu",
        created_at:new Date()
    }
]);
