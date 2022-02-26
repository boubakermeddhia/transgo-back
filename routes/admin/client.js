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

module.exports = router