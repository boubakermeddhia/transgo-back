const express = require('express')
const router = express.Router()
const Client = require('../../models/client')
const Auth = require('../../middleware/auth')


router.route('/getclient/:id').get(Auth, async (req, res) => {
    try {
        const user = await Client.findById(req.userid)
        if (user.secure == "2af264b99ff1d93e9477482ed9037db8" && user.numerotel != req.params.id) {

            const result = await Client.find({ numerotel: req.params.id })
            if (result.length != 0) {
                res.json({
                    _id: result[0]._id, name: result[0].name, adresse: result[0].adresse, createdate: result[0].createdate,
                    matricule: result[0].matricule, name: result[0].name, numerotel: result[0].numerotel,status:200
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


module.exports = router