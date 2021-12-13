const mongoose=require('mongoose')

const Schema=mongoose.Schema

const postschema=new Schema({
    numerotel:{type:String,unique:true,required:true},
    matricule:String,
    name:String,
    password:String,
    adresse:{type:String,required:true},
    createdate:{
        type:Date,
        default:new Date()
    },
    payment:{
        type:Date,
        default:""
    },
    secure:{
        type:String,
        default:""
    }
})

const Client=mongoose.model('clients',postschema)

module.exports= Client