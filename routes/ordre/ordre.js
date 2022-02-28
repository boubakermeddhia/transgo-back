const express = require('express')
const router = express.Router()
const Ordre = require('../../models/ordre')
const User = require('../../models/client')
const Auth = require('../../middleware/auth')
const pdfTemplate = require('./documents/pdfTemplate')
const bondesortie = require('./documents/bondesortie')
const bonderetour = require('./documents/bonderetour')
const bondelivraison = require('./documents/bondelivraison')
const bondesortieemployer = require('./documents/bondesortieemployer')
const historique_employer = require('./documents/historique_employer')
const pdf = require('html-pdf')
const { cwd } = require('process');
const client = require('twilio')("AC721c9eb90eb56fa32bfa960732f7a6ce", "0bc3dc3d09aa0e537421d37e3273c06f")


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

router.route('/createdorder').post(Auth, async (req, res) => {

    const post = req.body
    try {
        const result = await User.findById(req.userid)
        const newpost = new Ordre({ ...post, frais_sup: result.frais_sup, frais_colis: result.frais_colis, frais_annulation: result.frais_annulation })
        await newpost.save()
        res.json({ newpost, status: 200 })
        //User.messages
        // .create({
        //  to: '+21650384773',
        //  from: '+13254254397',
        // body: `${result.name} a Ajoutée un Colis`,
        //   })
        //  .then(message => console.log(message.sid))


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
    try {
        const existingorder = await Ordre.findById(req.params.id)
        if (existingorder.status == "Pending") {
            try {
                await Ordre.findByIdAndDelete(req.params.id)
                res.json({ status: 200 })
            } catch (error) {
                res.json({ message: "error", status: 400 })
            }
        } else {
            res.json({ status: 400 })
        }
    } catch (error) {
        res.json({ message: "error", status: 400 })
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

    pdf.create(bondesortie({ user: req.body.user, l: l }), {}).toFile('result.pdf', (err) => {
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

    pdf.create(bondelivraison({ user: req.body.user, l: l }), {}).toFile('result.pdf', (err) => {
        if (err) {
            res.send(Promise.reject());
        }
        res.send(Promise.resolve());
    })

})

router.route('/fetch-bondelivraison').get(Auth, (req, res) => {
    res.sendFile(cwd() + '/result.pdf')
})

router.route('/bonderetour').post(Auth, async (req, res) => {

    try {
        const result = await User.findById(req.userid)
        if (result.secure == "2af264b99ff1d93e9477482ed9037db8") {
            const client = await User.findById(req.body.colis_annulee[0].idclient)
            pdf.create(bonderetour({ user: client, l: req.body.colis_annulee }), {}).toFile('result.pdf', (err) => {
                if (err) {
                    res.send(Promise.reject());
                }
                res.send(Promise.resolve());
            })
        }
    } catch (error) {
        res.json({ status: 400 })
    }
})

router.route('/fetch-bonderetour').get(Auth, (req, res) => {
    res.sendFile(cwd() + '/result.pdf')
})

router.route('/bondesortieemployer').post(Auth, async (req, res) => {

    pdf.create(bondesortieemployer({ user: req.body.user, l: req.body.bondesortie }), {}).toFile('result.pdf', (err) => {
        if (err) {
            res.send(Promise.reject())
        }
        res.send(Promise.resolve());
    })

})

router.route('/fetch-bondesortieemployer').get(Auth, (req, res) => {
    res.sendFile(cwd() + '/result.pdf')
})

router.route('/historique_employer').post(Auth, async (req, res) => {

    pdf.create(historique_employer({ user: req.body.user, l: req.body.bondesortie }), {}).toFile('result.pdf', (err) => {
        if (err) {
            res.send(Promise.reject())
        }
        res.send(Promise.resolve());
    })

})

router.route('/fetch-historique_employer').get(Auth, (req, res) => {
    res.sendFile(cwd() + '/result.pdf')
})


module.exports = router