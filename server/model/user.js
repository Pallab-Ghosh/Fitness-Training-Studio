const mongoose=require('mongoose')
const {Schema}=mongoose
require('dotenv').config();

const url=`mongodb+srv://gpallab405:${process.env.Mongo_db_password}@cluster0.szdgz9x.mongodb.net/${process.env.Mongo_db}?retryWrites=true&w=majority`
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>console.log("mongo connected"))


const userSchema=new Schema({
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    mobile:{type:Number},
    address:{type:String,required:true},
    username:{type:String,required:true ,unique:true},
    date_and_time:{type:String},
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{type:String,minLength:8,required:true},
    course:{type:String},
    price_of_course:{type:Number},
    subscription_date:{type:String},
    totalSales:{type:Number}
})



const visitor_schema=new Schema({
    name:{type:String},
    email:{type:String},
    mobile:{type:String},
    message:{type:String}
})
exports.visitor_schema=mongoose.model('visitor_details',visitor_schema)
exports.user_Schema=mongoose.model('User_details',userSchema)