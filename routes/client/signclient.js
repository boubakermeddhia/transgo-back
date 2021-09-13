const express=require('express')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const Client=require('../../models/client')
const Auth=require('../../middleware/auth')
const crypto=require('crypto')
const router=express.Router()

router.route('/signin').post(async(req,res)=>{
    const params=req.body
    
    try{
        const existinguser= await Client.findOne({numerotel:params.numerotel})
        if (!existinguser){
            return res.json({message:'Error Authientication User not found',status:400})
        }
        if (( existinguser.secure=="577d7068826de925ea2aec01dbadf5e4") || (existinguser.secure=="2af264b99ff1d93e9477482ed9037db8") ){
    const passwordverifed=await bcrypt.compare(params.password,existinguser.password)
    if(!passwordverifed){
        return  res.json({message:'Error Authientication password is Invalid',status:400})
    }
        const secure= crypto.randomBytes(10).toString("hex")
        const token=jwt.sign({numerotel:existinguser.numerotel,id:existinguser._id},String(secure),{expiresIn:'1200s'})
        return res.json({_id:existinguser._id,name:existinguser.name,adresse:existinguser.adresse,createdate:existinguser.createdate,
            matricule:existinguser.matricule,name:existinguser.name,numerotel:existinguser.numerotel,token:token+'-'+String(secure)+'-'+String(existinguser.secure),status:200})
        }else{
            res.json({status:401})
        }
    }
    catch(error){
        return  res.json({status:400})
    }

})

router.route('/update/:id').put(Auth,async(req,res)=>{
    const params=req.body
    const id=req.params.id
    try {
        const existinguser= await Client.findOne({numerotel:params.numerotel})
        
        if(!existinguser || params.numerotel==existinguser.numerotel){
            if (params.password.length!=0){
                const hashedpassword=await bcrypt.hash(params?.password,12)
                var updateuser=await Client.findByIdAndUpdate(id,{password:hashedpassword, numerotel:params.numerotel,
                    matricule:params.matricule,name:params.name,adresse:params.adresse,},{new:true})
                return res.json({_id:updateuser._id,name:updateuser.name,adresse:updateuser.adresse,createdate:updateuser.createdate,
                        matricule:updateuser.matricule,name:updateuser.name,numerotel:updateuser.numerotel,status:200})
            }else{
            var updateuser=await Client.findByIdAndUpdate(id,{numerotel:params.numerotel,
                matricule:params.matricule,name:params.name,adresse:params.adresse,},{new:true})
            return res.json({_id:updateuser._id,name:updateuser.name,adresse:updateuser.adresse,createdate:updateuser.createdate,
                matricule:updateuser.matricule,name:updateuser.name,numerotel:updateuser.numerotel,status:200})
            }
        }
        else{
            res.json({status:400})
        }
        
       
    } catch (error) {
        res.json({status:400})
    }
})

module.exports=router