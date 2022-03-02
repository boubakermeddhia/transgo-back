const express = require('express')
const router = express.Router()
const User = require('../../models/client')
const Auth = require('../../middleware/auth')
const Ordre = require('../../models/ordre')



const removeDupliactes = (values) => {
    let concatArray = values.map(eachValue => {
        return Object.values(eachValue).join('')
    })
    let filterValues = values.filter((value, index) => {
        return concatArray.indexOf(concatArray[index]) === index

    })
    return filterValues
}

router.route('/getemployer/:id').get(Auth, async (req, res) => {
    try {
        const user = await User.findById(req.userid)
        if (user.secure == "2af264b99ff1d93e9477482ed9037db8" && user.numerotel != req.params.id) {

            const result = await User.find({ numerotel: req.params.id, secure: "9d104bb414a6226e2289e6eba70c0518" })
            if (result.length != 0) {
                res.json({
                    _id: result[0]._id, name: result[0].name, adresse: result[0].adresse, createdate: result[0].createdate,
                    matricule: result[0].matricule, secure: result[0].secure, numerotel: result[0].numerotel, status: 200
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

router.route('/get_info_employer/:id').get(Auth, async (req, res) => {
    let colis_info = []
    let colis_pending = []
    try {
        const user = await User.findById(req.userid)
        if (user.secure == "2af264b99ff1d93e9477482ed9037db8") {
            try {
                const result = await User.find({ _id: req.params.id })
                if (result.length != 0) {
                    if (result[0].colis_info.length != 0) {
                        for (let i = 0; i < result[0].colis_info.length; i++) {
                            let result1 = await Ordre.findById(result[0].colis_info[i])
                            colis_info.push(result1)
                        }
                    }
                    if (result[0].colis_pending.length != 0) {
                        for (let i = 0; i < result[0].colis_pending.length; i++) {
                            let result2 = await Ordre.findById(result[0].colis_pending[i])
                            colis_pending.push(result2)
                        }
                    }
                    res.json({
                        _id: result[0]._id, name: result[0].name, adresse: result[0].adresse, createdate: result[0].createdate,
                        matricule: result[0].matricule, name: result[0].name, numerotel: result[0].numerotel, colis_pending: colis_pending,
                        colis_info: colis_info, payment: result[0].payment, status: 200
                    })
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

router.route('/attribution_employer').post(Auth, async (req, res) => {

    try {
        const user = await User.findById(req.userid)
        if (user.secure == "2af264b99ff1d93e9477482ed9037db8") {
            const employer = await User.findById(req.body.user)
            let colis_pending = Array(...new Set([...employer.colis_pending, ...req.body.colis_pending]))
            employer.colis_pending = removeDupliactes(colis_pending)
            for (let i = 0; i < employer.colis_pending.length; i++) {
                const status = await Ordre.findById(employer.colis_pending[i])
                status.status = "Colis en cours de livraison"
                status.id_livreur=employer._id
                await Ordre.findByIdAndUpdate(employer.colis_pending[i], status)
            }
            await User.findByIdAndUpdate(req.body.user, employer)
            res.json({ status: 200 })
        } else {
            res.json({ status: 400 })
        }
    } catch (error) {
        res.json({ status: 400 })
    }
})

router.route('/nouvel_journee').post(Auth, async (req, res) => {

    try {
        const user = await User.findById(req.userid)
        if (user.secure == "2af264b99ff1d93e9477482ed9037db8") {
            const employer = await User.findById(req.body.user)
            for (let i = 0; i < employer.colis_pending.length; i++) {
                const colis = await Ordre.findById(employer.colis_pending[i])
                if (colis.status == "Colis en cours de livraison") {
                    colis.status = "Dépot"
                    await Ordre.findByIdAndUpdate(employer.colis_pending[i], colis)
                }
            }
            employer.colis_pending = []
            await User.findByIdAndUpdate(req.body.user, employer)
            res.json({ status: 200 })
        } else {
            res.json({ status: 400 })
        }
    } catch (error) {
        res.json({ status: 400 })
    }
})

router.route('/modifier').post(Auth, async (req, res) => {
    try {
        console.log(req.body);
        const user = await User.findById(req.userid)
        if (user.secure == "2af264b99ff1d93e9477482ed9037db8") {
            const result = await User.find({ _id: req.body.id })
            console.log(result);
            if (result.length != 0) {
                result[0].frais_sup = req.body.frais_sup
                result[0].frais_colis = req.body.frais_colis
                result[0].frais_annulation = req.body.frais_annulation
                await User.findByIdAndUpdate(result[0]._id, result[0], { new: true })
                res.json({ status: 200 })
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

router.route('/getemployer/').post(Auth, async (req, res) => {
    try {
        const user = await User.findById(req.userid)
        if (user.secure == "2af264b99ff1d93e9477482ed9037db8") {
            const result = await User.find({ numerotel: req.body.value, secure: "577d7068826de925ea2aec01dbadf5e4" })
            if (result.length != 0) {
                res.json({
                    _id: result[0]._id, name: result[0].name, adresse: result[0].adresse, createdate: result[0].createdate,
                    matricule: result[0].matricule, secure: result[0].secure, numerotel: result[0].numerotel, status: 200
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

router.route('/chargement_colis').post(Auth, async (req, res) => {
    var x = new Date()
    try {
        var user = await User.findById(req.userid)
        if (user.secure == "2af264b99ff1d93e9477482ed9037db8") {
            for (let i = 0; i < req.body.chargement.length; i++) {
                var status = await Ordre.findById(req.body.chargement[i])
                status.id_livreur = req.userid
                status.status = req.body.option
                status.datefin = x.getFullYear() + "-" + (x.getMonth() + 1) + "-" + x.getDate()
                await Ordre.findByIdAndUpdate(req.body.chargement[i], status)
            }
            res.json({ status: 200 })
        } else {
            res.json({ status: 400 })
        }
    } catch (error) {
        res.json({ status: 400 })
    }
})


module.exports = router
