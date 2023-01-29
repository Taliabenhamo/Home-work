
const mongoose=require('mongoose')

const CarSchema =  mongoose.Schema({
    type:String,
      model:String,
      year:Number,
      color:String,
      price:Number,
      acceleration:Number,
      maximum_speed: Number,
      description:String,
      Inventory:Number
    })

    const carModel=mongoose.model("carModel",CarSchema,"cars")
    module.exports=carModel;