const express = require('express');
const { UserModel } = require('../models/users.model');

const UserRoutes = express.Router()

//Read
UserRoutes.get("/", async (req, res) => {
    const use = await UserModel.find()
    res.send(use)
})


//Create
UserRoutes.post("/create", async (req, res) => {
    const { title, body , device } = req.body
    try {
        const new_user = new UserModel({
            title,
            body,
            device
        })
        await new_user.save()
        res.send("Successfull Entered")
    } catch (error) {
        console.log(error);
        res.send("Something went wrong")
    }
})

//update
UserRoutes.patch("/update/:post", async (req, res) => {
    const postid = req.params.postid
    
    try {
        await UserModel.findByIdAndUpdate(postid,req.body)
        res.send("Successfully updated")
    } catch (error) {
        console.log(error);
        res.send("something went wrong")
    }
})

//delete
UserRoutes.delete("/delete/:post", async (req, res) => {
    const postid = req.params.postid
    
    try {
        await UserModel.findByIdAndDelete(postid,req.body)
        res.send("deleted")
    } catch (error) {
        console.log(error);
        res.send("something went wrong")
    }
})


module.exports = { UserRoutes }