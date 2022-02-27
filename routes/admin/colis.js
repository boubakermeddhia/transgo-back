const express = require('express')
const router = express.Router()
const User = require('../../models/client')
const Auth = require('../../middleware/auth')
const Ordre = require('../../models/ordre')


router.route('/getcolis').get(Auth, async (req, res) => {
    try {
        const admin = await User.findById(req.userid)
        if (admin.secure == "2af264b99ff1d93e9477482ed9037db8") {
            const result = await Ordre.find()
            res.json({ result, status: 200 })
        }
    } catch (error) {
        res.json({ status: 400 })
    }
})

module.exports = router
