const express = require('express')
const router = express.Router()
const Ordre = require('../../models/ordre')
const Auth = require('../../middleware/auth')
const pdfTemplate = require('./documents/pdfTemplate')
const bondesortie = require('./documents/bondesortie')
const bondelivraison=require('./documents/bondelivraison')
const pdf = require('html-pdf')
const { cwd } = require('process');



router.route('/getordre/:id').get(Auth, async (req, res) => {
    try {
        const result = await Ordre.find({ idclient: req.params.id })
        if (req.userid == req.params.id) {
            res.json({ result, status: 200 })
        }
    } catch (error) {
        res.json({ status: 400 })
    }

})

router.route('/createdorder').post(async (req, res) => {

    const post = req.body

    try {
        const newpost = new Ordre(post)
        await newpost.save()
        res.json({ newpost, status: 200 })

    } catch (error) {
        res.json({ message: "error", status: 400 })
    }
})

router.route('/update/:id').put(Auth, async (req, res) => {
    const post = req.body
    const existingorder = await Ordre.findById(req.params.id)
    if (existingorder.status == "Pending") {
        await Ordre.findByIdAndUpdate(req.params.id, post, { new: true })
            .then(ex => res.json({ resultat: ex, status: 200 }))
            .catch(err => res.json({ message: "error", status: 400 }))
    } else {
        res.json({ status: 400 })
    }

})

router.route('/delete/:id').delete(Auth, async (req, res) => {
    const existingorder = await Ordre.findById(req.params.id)
    if (existingorder.status == "Pending") {
        try {
            const data = await Ordre.findByIdAndDelete(req.params.id)
            res.json({ status: 200 })
        } catch (error) {
            res.json({ message: "error", status: 400 })
        }
    } else {
        res.json({ status: 400 })
    }
})

router.route('/create-pdf').post(Auth, (req, res) => {

    pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', (err) => {
        if (err) {
            res.send(Promise.reject());
        }
        res.send(Promise.resolve());
    })
})

router.route('/fetch-pdf').get(Auth, (req, res) => {
    res.sendFile(cwd() + '/result.pdf')
})

router.route('/bondesortie').post(Auth, async (req, res) => {
    var l = []
    for (let i = 0; i < req.body.bondesortie.length; i++) {
        try {
            if (req.userid == req.body.user._id) {
                const result = await Ordre.findById(req.body.bondesortie[i])
                l.push(result)
            }
        } catch (error) {
            res.json({ status: 400 })
        }
    }

    pdf.create(bondesortie(l), {}).toFile('result.pdf', (err) => {
        if (err) {
            res.send(Promise.reject());
        }
        res.send(Promise.resolve());
    })

})

router.route('/fetch-bondesortie').get(Auth, (req, res) => {
    res.sendFile(cwd() + '/result.pdf')
})

router.route('/bondelivraison').post(Auth, async (req, res) => {
    
    var l = []
    for (let i = 0; i < req.body.bondesortie.length; i++) {
        try {
            if (req.userid == req.body.user._id) {
                const result = await Ordre.findById(req.body.bondesortie[i])
                l.push(result)
            }
        } catch (error) {
            res.json({ status: 400 })
        }
    }
    console.log({user:req.body.user,l:l})

    pdf.create(bondelivraison({user:req.body.user,l:l}), {}).toFile('result.pdf', (err) => {
        if (err) {
            res.send(Promise.reject());
        }
        res.send(Promise.resolve());
    })

})

router.route('/fetch-bondelivraison').get(Auth, (req, res) => {
    res.sendFile(cwd() + '/result.pdf')
})



module.exports = router