const express = require('express')
const router = express.Router()
const User = require('../../models/client')
const Auth = require('../../middleware/auth')
const Ordre = require('../../models/ordre')


router.route('/getclient/:id').get(Auth, async (req, res) => {
    try {
        const user = await User.findById(req.userid)
        if (user.secure == "2af264b99ff1d93e9477482ed9037db8" && user.numerotel != req.params.id) {

            const result = await User.find({ numerotel: req.params.id })
            if (result.length != 0) {
                res.json({
                    _id: result[0]._id, name: result[0].name, adresse: result[0].adresse, createdate: result[0].createdate,
                    matricule: result[0].matricule, name: result[0].name, payment: result[0].payment, numerotel: result[0].numerotel, status: 200
                })

            } else {
                res.json({ status: 400 })
            }

        } else {
            res.json({ status: 400 })
        }
    } catch (error) {
        res.json({ status: 401 })
    }

})

router.route('/getordre/:id').post(Auth, async (req, res) => {
    try {
        const user = await User.findById(req.userid)
        if (user.secure == "2af264b99ff1d93e9477482ed9037db8") {
            const result = await Ordre.find({ idclient: req.params.id })
            res.json({ result: result, status: 200 })
        } else {
            res.json({ status: 400 })
        }
    } catch (error) {
        res.json({ status: 400 })
    }
})

router.route('/getordre/:id').get(Auth, async (req, res) => {
    try {
        const user = await User.findById(req.userid)
        if (user.secure == "2af264b99ff1d93e9477482ed9037db8") {
            const result = await Ordre.findById(req.params.id)
            res.json({ result: result, status: 200 })

        } else {
            res.json({ status: 400 })
        }
    } catch (error) {
        res.json({ status: 400 })
    }
})

router.route('/getcolis/:id').get(Auth, async (req, res) => {
    var result1 = []
    var Livrer = []
    var fournisseur = []
    try {
        const user = await User.findById(req.userid)
        if (user.secure == "2af264b99ff1d93e9477482ed9037db8") {
            var result1 = await Ordre.find({ _id: req.params.id })
            if (result1[0].status == "Livrée" || result1[0].status == "Annulée" || result1[0].status == "Colis en cours de livraison") {
                var Livrer = [await User.findById(result1[0].id_livreur)]
            } else {
                var Livrer = []
            }
            var fournisseur = [await User.findById(result1[0].idclient)]

            res.json({ result: result1, Livrer, fournisseur, status: 200 })
        } else {
            res.json({ status: 400 })
        }
    } catch (error) {
        res.json({ status: 400 })
    }
})

router.route('/modifier_colis').post(Auth, async (req, res) => {
    let nbr = 0
    var x = new Date()
    try {
        const user = await User.findById(req.userid)
        if (user.secure == "2af264b99ff1d93e9477482ed9037db8") {
            const result = await Ordre.find({ _id: req.body.id })
            if (Number(result[0].qte) > Number(req.body.qte)) {
                nbr = Number(result[0].qte) - Number(req.body.qte)
                result[0].qte = req.body.qte
                result[0].isActif = false
                await Ordre.findByIdAndUpdate(req.body.id, result[0])
                for (let i = 0; i < nbr; i++) {
                    const newcolis = new Ordre(
                        {
                            numerotel: result[0].numerotel,
                            name: result[0].name,
                            prix: result[0].prix,
                            naturecolis: result[0].naturecolis,
                            poidcolis: result[0].poidcolis,
                            adresse: result[0].adresse,
                            createdate: result[0].createdate,
                            status: "Annulée",
                            idclient: result[0].idclient,
                            datefin: x.getFullYear() + "-" + (x.getMonth() + 1) + "-" + x.getDate(),
                            isActif: false,
                            qte: "1",
                            frais_sup: "0",
                            frais_colis: "0",
                            frais_annulation: "0",
                            frais_inclus: result[0].frais_inclus,
                            fournisseur: result[0].fournisseur,
                            id_livreur: result[0].id_livreur,
                        })
                    await newcolis.save()
                }
                res.json({ status: 200 })
            } else {
                res.json({ status: 401 })
            }
        } else {
            res.json({ status: 400 })
        }
    } catch (error) {
        res.json({ status: 400 })
    }
})


module.exports = router