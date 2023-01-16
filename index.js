const express = require('express');
const { connection } = require('./config/db');
const jwt = require('jsonwebtoken');
const cors = require("cors")
const { UserModel } = require('./models/users.model');
const {RegisterModel} = require("./models/register.model")
const {UserRoutes} = require("./routes/user.route")
require("dotenv").config()

const app=express()

app.use(express.json())
app.use(cors({
    origin : "*"
}))

app.get("/",(req,res)=>{
    res.send("Welcome to Social Media App")
})

app.post("/register",async(req,res)=>{
    const {name,email,gender,password}=req.body
    try {
        const new_user=new RegisterModel({
            name,
            email,
            gender,
            password
        })
        // console.log(new_user)
        await new_user.save()
        return res.send("Successfully Registered")
    } catch (error) {
        res.send("Please Register")
    }    
})

app.post("/login",async (req,res)=>{
    const {email,password}=req.body
    const user = await RegisterModel.findOne({email,password})
    if(!user){
        return res.send({responce:-1})
    }
    try {
        const token=await jwt.sign({email},process.env.secret);
        return res.send({response:"Succesfully",token:token,userid:user._id})
    } catch (error) {
        console.log(error);
        return res.send({response:-1})
    }
})

const authentication = (req,res,next)=>{
    if(!req.headers.token){
        return res.send({response:"user not logged in"})
    }
    const user_token=req.headers.token
    jwt.verify(user_token, process.env.secret, function (err, decoded) {
        if (err) {
            console.log(err);
        }
        next()
    });
}

app.use(authentication)

app.use("/posts",UserRoutes)


app.listen(process.env.port,async ()=>{
    try {
        await connection
        console.log("Connected to DB");
    } catch (err) {
        console.log("Something went wrong with connection :"+err);
    }
    console.log("Server Running at http://localhost:"+process.env.port);
})