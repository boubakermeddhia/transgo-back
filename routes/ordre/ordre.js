const express=require('express')
const router=express.Router()
const Ordre = require('../../models/ordre')
const Auth =require('../../middleware/auth')
const pdfTemplate = require('./documents/pdfTemplate')
const pdf = require('html-pdf')
const { cwd } =require('process');



router.route('/getordre/:id').get(Auth,async(req,res)=>{
    try {
       const result= await Ordre.find({idclient:req.params.id})
       if(req.userid==req.params.id)
       {
       res.json({result,status:200})
       }
    } catch (error) {
        res.json({status:400})
    }
    
})

router.route('/createdorder').post(Auth,async(req,res)=>{
    
    const post=req.body

    try {
    const newpost=new Ordre(post)
      await  newpost.save()
        res.status(200).json(newpost)
    } catch (error) {
        res.status(400).json({error})
    }
})

router.route('/update/:id').put(Auth,async (req,res)=>{
    const post=req.body
    const existingorder= await Ordre.findById(req.params.id)
    if(existingorder.status == "Pending"){
        await Ordre.findByIdAndUpdate(req.params.id,post,{new:true})
        .then(ex=>res.json({resultat:ex,status:200}))
        .catch(err=>res.json({message:"error",status:400}))
    }else{
        res.json({status:400})
    }
    
})

router.route('/delete/:id').delete(Auth,async (req,res)=>{
    const existingorder= await Ordre.findById(req.params.id)
    if(existingorder.status == "Pending"){
    try {
       const data= await Ordre.findByIdAndDelete(req.params.id)
        res.status(200).json(data)
    } catch (error) {
        res.status(400).json(error)
    }
    }else{
    res.json({status:400})
}})

router.route('/create-pdf').post(Auth,(req, res) => {
    
    pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
        if(err) {
            res.send(Promise.reject());
        }
        res.send(Promise.resolve());
    })
})

router.route('/fetch-pdf').get(Auth,(req, res) => {
    res.sendFile(cwd()+'/result.pdf')
})


module.exports=router