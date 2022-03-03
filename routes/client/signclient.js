const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/client')
const Ordre = require('../../models/ordre')
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
        if ((existinguser.secure == "577d7068826de925ea2aec01dbadf5e4") || (existinguser.secure == "2af264b99ff1d93e9477482ed9037db8")) {
            const passwordverifed = await bcrypt.compare(params.password, existinguser.password)
            if (!passwordverifed) {
                return res.json({ message: 'Error Authientication password is Invalid', status: 400 })
            }
            const secure = crypto.randomBytes(10).toString("hex")
            const token = jwt.sign({ numerotel: existinguser.numerotel, id: existinguser._id }, String(secure), { expiresIn: '2h' })
            return res.json({
                _id: existinguser._id, name: existinguser.name, adresse: existinguser.adresse, createdate: existinguser.createdate,
                matricule: existinguser.matricule, name: existinguser.name, payment: existinguser.payment, numerotel: existinguser.numerotel, token: token + '-' + String(secure) + '-' + String(existinguser.secure), status: 200
            })
        } else {
            res.json({ status: 401 })
        }
    }
    catch (error) {
        return res.json({ status: 400 })
    }

})

router.route('/update/:id').put(Auth, async (req, res) => {
    const params = req.body
    const id = req.params.id
    try {
        const existinguser = await User.findOne({ numerotel: params.numerotel })

        if (!existinguser || params.numerotel == existinguser.numerotel) {
            if (params.password.length != 0) {
                const hashedpassword = await bcrypt.hash(params.password, 12)
                var updateuser = await User.findByIdAndUpdate(id, {
                    password: hashedpassword, numerotel: params.numerotel,
                    matricule: params.matricule, name: params.name, adresse: params.adresse,
                }, { new: true })
                return res.json({
                    _id: updateuser._id, name: updateuser.name, adresse: updateuser.adresse, createdate: updateuser.createdate,
                    matricule: updateuser.matricule, name: updateuser.name, numerotel: updateuser.numerotel, status: 200
                })
            } else {
                var updateuser = await User.findByIdAndUpdate(id, {
                    numerotel: params.numerotel,
                    matricule: params.matricule, name: params.name, adresse: params.adresse,
                }, { new: true })
                return res.json({
                    _id: updateuser._id, name: updateuser.name, adresse: updateuser.adresse, createdate: updateuser.createdate,
                    matricule: updateuser.matricule, name: updateuser.name, numerotel: updateuser.numerotel, status: 200
                })
            }
        }
        else {
            res.json({ status: 400 })
        }


    } catch (error) {
        res.json({ status: 400 })
    }
})

router.route('/payment').post(Auth, async (req, res) => {
    const date = req.body.payment
    const use = req.body.user
    try {
        const admin = await User.findById(req.userid)
        console.log(use)
        if (admin.secure == "2af264b99ff1d93e9477482ed9037db8") {
            const existinguser = await User.findById(use)

            if (existinguser.secure == "577d7068826de925ea2aec01dbadf5e4") {
                if (existinguser) {
                    existinguser.payment = date
                    const updateuser = await User.findByIdAndUpdate(use, existinguser,{ new: true })
                    
                    return res.json({
                        _id: updateuser._id, name: updateuser.name, adresse: updateuser.adresse, createdate: updateuser.createdate,
                        matricule: updateuser.matricule, name: updateuser.name, payment: updateuser.payment, numerotel: updateuser.numerotel, status: 200
                    })
                }
            }
            else {
                res.json({ status: 400 })
            }
        }
        else {
            res.json({ status: 400 })
        }

    } catch (error) {
        res.json({ status: 400 })
    }
})

router.route('/payment/employer').post(Auth, async (req, res) => {
    const date = req.body.payment
    const use = req.body.user
    try {
        const admin = await User.findById(req.userid)
        if (admin.secure == "2af264b99ff1d93e9477482ed9037db8") {
            const existinguser = await User.findById(use)
            if (existinguser.secure == "9d104bb414a6226e2289e6eba70c0518") {
                if (existinguser) {
                    existinguser.payment = date
                    await User.findByIdAndUpdate(existinguser._id, existinguser, { new: true })
                    res.json({ status: 200 })
                }
            }
            else {
                res.json({ status: 400 })
            }
        }
        else {
            res.json({ status: 400 })
        }

    } catch (error) {
        res.json({ status: 400 })
    }
})

router.route('/accee/employer').post(Auth, async (req, res) => {
    const colis = req.body.id
    const type = req.body.type
    try {
        const admin = await User.findById(req.userid)
        if (admin.secure == "577d7068826de925ea2aec01dbadf5e4") {
            const existinguser = await Ordre.findById(colis)
            existinguser.isActif = type
            await Ordre.findByIdAndUpdate(colis, existinguser, { new: true })
            res.json({ status: 200 })
        }
        else {
            res.json({ status: 400 })
        }
    } catch (error) {
        res.json({ status: 400 })
    }
})

module.exports = router