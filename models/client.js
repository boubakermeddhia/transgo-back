const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postschema = new Schema({
    numerotel: { type: String, unique: true, required: true },
    matricule: String,
    name: String,
    password: String,
    adresse: { type: String, required: true },
    createdate: {
        type: Date,
        default: new Date()
    },
    payment: {
        type: Date,
        default: ""
    },
    secure: {
        type: String,
        default: ""
    },
    colis_info: {
        type: Array,
        default: []
    },
    colis_pending: {
        type: Array,
        default: []
    },
    frais_sup: { type: String, default: "0" },
    frais_colis: { type: String, default: "7" },
    frais_annulation: { type: String, default: "2" },
    position: {
        type: Array,
        default: []
    }
})

const User = mongoose.model('Users', postschema)

module.exports = User