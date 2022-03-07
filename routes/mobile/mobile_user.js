const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/client')
const Auth = require('../../middleware/auth')
const crypto = require('crypto')
const router = express.Router()


router.route('/signin').post(async (req, res) => {
    const params = req.body
    try {
        const existinguser = await User.findOne({ numerotel: params.numerotel })
        if (!existinguser) {
            return res.json({ message: 'Error Authientication User not found', status: 400 })
        }
        if (existinguser.secure != "577d7068826de925ea2aec01dbadf5e4") {
            const passwordverifed = await bcrypt.compare(params.password, existinguser.password)
            if (!passwordverifed) {
                return res.json({ message: 'Error Authientication password is Invalid', status: 400 })
            }
            const secure = crypto.randomBytes(10).toString("hex")
            const token = jwt.sign({ numerotel: existinguser.numerotel, id: existinguser._id }, String(secure), { expiresIn: '12h' })
            return res.json({
                _id: existinguser._id, name: existinguser.name, adresse: existinguser.adresse, createdate: existinguser.createdate,
                matricule: existinguser.matricule, name: existinguser.name, numerotel: existinguser.numerotel, token: token + '-' + String(secure) + '-' + String(existinguser.secure), status: 200
            })
        } else {
            return res.json({ status: 401 })
        }
    } catch (error) {
        return res.status(400).json({ error })
    }

})

router.route('/signup').post(Auth, async (req, res) => {
    const params = req.body
    try {
        const adminverif = await User.findById(req.userid)
        if (adminverif.secure == "2af264b99ff1d93e9477482ed9037db8") {
            const existinguser = await User.findOne({ numerotel: params.numerotel })
            if (existinguser) {
                return res.status(400).json({ messsage: 'Error Authientication User exist!!' })
            }
            const hashedpassword = await bcrypt.hash(params.password, 12)
            const createuser = new User({
                numerotel: params.numerotel, adresse: params.adresse, password: hashedpassword,
                name: params.name, matricule: params.matricule, secure: params.secure
            })
            createuser.save()
            return res.json({ message: "User Successfully created", status: 200 })
        }
        else {
            res.json({ status: 401 })
        }
    } catch (error) {
        res.json({ status: 400 })
    }
})

router.route('/getlocation/').post(Auth, async (req, res) => {
    const params = req.body
    try {
        const adminverif = await User.findById(req.userid)
        adminverif.position = [params]
        await User.findByIdAndUpdate(adminverif._id, adminverif)
        res.status(200).json({ message: params })

    } catch (error) {
        res.json({ status: 400 })
    }

})

module.exports = router
