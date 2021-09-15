const express=require('express')
const router=express.Router()
const Client = require('../../models/client')
const Auth =require('../../middleware/auth')


router.route('/getemployer').get(Auth,async(req,res)=>{
    try {
       const user= await Client.findById(req.userid)
       if (user.secure=="2af264b99ff1d93e9477482ed9037db8"){
       
       const result= await Client.find({secure:"ab5657f443a658ed411b4293ad4a8cca"})
     
       res.json({result,status:200})

       }
    } catch (error) {
        res.json({status:403})
    }
    
})



module.exports=router