const express=require('express')
const router=express.Router()
const Ordre = require('../../models/ordre')
const Client = require('../../models/client')
const Auth=require('../../middleware/auth')

router.route('/getordrebydate').post(async(req,res)=>{
    var l=[]
    const params=req.body
    try {
       const result= await Ordre.find({createdate: {$gt:  params.datedebut,$lt:  params.datefin}})
       for(let i=0;i<result.length;i++){
        var user=await Client.findById(result[i].idclient)
            l.push({ordre:{_id:result[i]._id,numerotel:result[i].numerotel,name:result[i].name
                ,prix:result[i].prix,naturecolis:result[i].naturecolis
                ,poidcolis:result[i].poidcolis,adresse:result[i].adresse,status:result[i].status,datefin:result[i].datefin},
                client:{
                    numerotel:user.numerotel, matricule:user.matricule,name:user.name,adresse:user.adresse,secure:user.secure
                }})}
    
    res.json(l)
      
    }catch (error) {
        res.json({status:400})
    }
    
})

router.route('/getordrebyid').post(Auth,async(req,res)=>{
    var l=[]
    const params=req.body
    try {
      
       const result= await Ordre.find({_id:params.search})

       for(let i=0;i<result.length;i++){
        var user=await Client.findById(result[i].idclient)
            l.push({ordre:{_id:result[i]._id,numerotel:result[i].numerotel,name:result[i].name
                ,prix:result[i].prix,naturecolis:result[i].naturecolis
                ,poidcolis:result[i].poidcolis,adresse:result[i].adresse,status:result[i].status,datefin:result[i].datefin},
                client:{
                    numerotel:user.numerotel, matricule:user.matricule,name:user.name,adresse:user.adresse,secure:user.secure
                }})}
    
    res.status(200).send(l)
      
    }catch (error) {
        res.json({status:400})
    }
    
})

router.route('/modifierordre/:id/:status').put(Auth,async (req,res)=>{
var x=new Date()
    try {
        let modifier=await Ordre.findById(req.params.id)
        modifier.status=req.params.status
        modifier.datefin=x.getFullYear()+"-"+(x.getMonth()+1)+"-"+x.getDate()
        await Ordre.findByIdAndUpdate(req.params.id,modifier,{new:true})
        .then(()=>{
            res.json({status:200})
        })
    
    } catch (error) {
        return  res.json({status:400})
    }
   

})

    

module.exports=router