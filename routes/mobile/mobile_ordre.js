const express = require('express')
const router = express.Router()
const Ordre = require('../../models/ordre')
const User = require('../../models/client')
const Auth = require('../../middleware/auth')

router.route('/getordrebydate').post(Auth, async (req, res) => {
    var l = []
    const params = req.body
    try {
        const result = await Ordre.find({ createdate: { $gt: params.datedebut, $lt: params.datefin } })
        console.log(result)
        for (let i = 0; i < result.length; i++) {
            var user = await User.findById(result[i].idclient)
            l.push({
                ordre: {
                    _id: result[i]._id, numerotel: result[i].numerotel, name: result[i].name
                    , prix: result[i].prix, naturecolis: result[i].naturecolis,
                    qte: result[i].qte, frais_annulation: result[i].frais_annulation, frais_colis: result[i].frais_colis, frais_sup: result[i].frais_sup, poidcolis: result[i].poidcolis, adresse: result[i].adresse, status: result[i].status, datefin: result[i].datefin
                },
                client: {
                    numerotel: user.numerotel, matricule: user.matricule, name: user.name, adresse: user.adresse, secure: user.secure
                }
            })
        }

        res.json(l)

    } catch (error) {
        res.json({ status: 400 })
    }

})

router.route('/getordrebyid').post(Auth, async (req, res) => {
    var l = []
    const params = req.body
    try {

        const result = await Ordre.find({ _id: params.search })

        for (let i = 0; i < result.length; i++) {
            var user = await User.findById(result[i].idclient)
            l.push({
                ordre: {
                    _id: result[i]._id, numerotel: result[i].numerotel, name: result[i].name
                    , prix: result[i].prix, naturecolis: result[i].naturecolis
                    , qte: result[i].qte, frais_inclus: result[i].frais_inclus, frais_annulation: result[i].frais_annulation, frais_colis: result[i].frais_colis, frais_sup: result[i].frais_sup, poidcolis: result[i].poidcolis, adresse: result[i].adresse, status: result[i].status, datefin: result[i].datefin
                },
                client: {
                    numerotel: user.numerotel, matricule: user.matricule, name: user.name, adresse: user.adresse, secure: user.secure
                }
            })
        }

        res.status(200).send(l)

    } catch (error) {
        res.json({ status: 400 })
    }

})

router.route('/modifierordre/:id/:status').put(Auth, async (req, res) => {
    var x = new Date()
    try {
        const adminverif = await User.findById(req.userid)
        if (adminverif.secure == "2af264b99ff1d93e9477482ed9037db8") {
            let modifier = await Ordre.findById(req.params.id)
            modifier.status = req.params.status
            modifier.id_livreur = req.userid
            modifier.datefin = x.getFullYear() + "-" + (x.getMonth() + 1) + "-" + x.getDate()
            await Ordre.findByIdAndUpdate(req.params.id, modifier, { new: true })
                .then(() => {
                    res.json({ status: 200 })
                })
        } else {
            res.json({ status: 400 })
        }
    } catch (error) {
        return res.json({ status: 400 })
    }

})

router.route('/getmyjob').get(Auth, async (req, res) => {
    let colis_pending = []
    try {
        const user = await User.findById(req.userid)
        if (user.secure == "9d104bb414a6226e2289e6eba70c0518") {
            try {
                const result = await User.find({ _id: req.userid })
                if (result.length != 0) {
                    if (result[0].colis_pending.length != 0) {
                        for (let i = 0; i < result[0].colis_pending.length; i++) {
                            let result2 = await Ordre.findById(result[0].colis_pending[i])
                            colis_pending.push(result2)
                        }
                    }
                    res.json({ colis_pending: colis_pending, status: 200 })
                } else {
                    res.json({ status: 400 })
                }
            } catch (error) {
                res.json({ status: 400 })
            }
        } else {
            res.json({ status: 400 })
        }
    } catch (error) {
        res.json({ status: 401 })
    }

})

router.route('/modifierordrebyemployer/:id/:status').get(Auth, async (req, res) => {
    var x = new Date()
    try {
        var adminverif = await User.findById(req.userid)
        if (adminverif.secure == "9d104bb414a6226e2289e6eba70c0518") {
            var modifier = await Ordre.findById(req.params.id)
            if (modifier.status == "Livrée" || modifier.status == "Annulée" || modifier.status == "Dépot") {
                res.json({ status: 400 })
            }
            if (modifier.status == "Colis en cours de livraison" && adminverif._id != modifier.id_livreur) {
                var user = await User.findById(modifier.id_livreur)
                var nouvel = user.colis_pending.filter(item => item != modifier._id)
                user.colis_pending = nouvel
                await User.findByIdAndUpdate(user._id, user, { new: true })
                adminverif.colis_pending.push(modifier._id)
            }
            modifier.status = req.params.status
            modifier.id_livreur = req.userid
            modifier.datefin = x.getFullYear() + "-" + (x.getMonth() + 1) + "-" + x.getDate()
            const ordre = await Ordre.findByIdAndUpdate(req.params.id, modifier, { new: true })
            adminverif.colis_info.push(ordre)
            await User.findByIdAndUpdate(adminverif._id, adminverif, { new: true })

            res.json({ status: 200 })
        } else {
            res.json({ status: 400 })
        }
    } catch (error) {
        return res.json({ status: 400 })
    }
})

router.route('/getmyjobemployer/:id').get(Auth, async (req, res) => {

    try {
        const user = await User.findById(req.userid)
        if (user.secure == "9d104bb414a6226e2289e6eba70c0518") {
            try {
                const result = await Ordre.findById(req.params.id)
                const user = await User.findById(result.idclient)
                res.json({ colis_pending: [result], user: [user], status: 200 })
            } catch (error) {
                res.json({ status: 400 })
            }
        } else {
            res.json({ status: 400 })
        }
    } catch (error) {
        res.json({ status: 401 })
    }

})

module.exports = router