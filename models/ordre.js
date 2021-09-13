const mongoose=require('mongoose')

const Schema=mongoose.Schema

const postschema=new Schema({
    numerotel:{type:String,required:true},
    name:{type:String},
    prix:{type:String,required:true},
    naturecolis:{type:String},
    poidcolis:{type:String},
    adresse:{type:String,required:true},
    createdate:String,
    status:{
        type:String,
        default:"Pending"
    },
    idclient:String,
    datefin:{
        type:String,
        default:""
    }
})

const Ordre=mongoose.model('ordres',postschema)

module.exports= Ordre