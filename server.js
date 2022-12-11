const express = require('express');
const Jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();
const {connection} = require('./config/DB');
const {Usermodel} = require('./Models/UserModel');
const { authenticate } = require('./middleware/authentication');
const { Notes } = require('./routes/notes.routes');
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Welcome");
})

app.post('/signup', async(req,res)=>{
    console.log(req.body);
    const {email,password} = req.body;
    const userpresent = await Usermodel.findOne({email});
    if(userpresent?.email){
        res.send("Try Logging in user already exists");
    }
    else {
        try{
            bcrypt.hash(password,4,async function (err,hash){
              const user = new Usermodel({email,password:hash});
              await user.save();
              res.send("Signup Successfull")
            })
        }catch (err){
            res.send("Something went wrong try again later");
        }
    }
})

app.post("/login",async (req,res)=>{
    console.log(req.body);
    const {email,password} = req.body;
    try{
        const User = await Usermodel.find({email});
        if(User.length>0){
            const hashed_password = User[0].password;
            bcrypt.compare(password,hashed_password,function (err,result){
                if(result){
                    const token = Jwt.sign({"User_id":User[0]._id},'hush');
                    res.send({"msg":"Login Sucessfull","token":token});
                }else {
                    res.send("Login failed")
                }
            })
        }else {
            res.send("Login Failed")
        }
    }catch{
        res.send("Something went wrong, please try again later")
    }
})

app.get("/about",(req,res)=>{
    res.send("About us data");
})
app.use(authenticate);
app.use('/notes',Notes)
app.listen(8009,async ()=>{
    try{
        await connection;
        console.log("connection done successfully");
    }catch(err){
      console.log(err)
    }
})