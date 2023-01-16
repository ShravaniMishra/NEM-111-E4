const mongoose = require("mongoose")

const registerSchema = mongoose.Schema({
  name:String,
  email:String,
  gender:String,
  password:String
},{
    versionKey:false
})

const RegisterModel = mongoose.model("register",registerSchema)

module.exports={
    RegisterModel
}