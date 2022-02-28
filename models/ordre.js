const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postschema = new Schema({
    numerotel: { type: String, required: true },
    name: { type: String },
    prix: { type: String, required: true },
    naturecolis: { type: String },
    poidcolis: { type: String },
    adresse: { type: String, required: true },
    createdate: String,
    status: {
        type: String,
        default: "Pending"
    },
    idclient: String,
    datefin: {
        type: String,
        default: ""
    },
    isActif: {
        type: Boolean,
        default: false
    },
    qte: { type: String, required: true },
    frais_sup: { type: String, default: "0" },
    frais_colis: { type: String, default: "7" },
    frais_annulation: { type: String, default: "2" },
    frais_inclus: { type: Boolean, default: false },
    fournisseur: {
        type: String,
        default: ""
    },
    id_livreur: { type: String, default: "" }

})

const Ordre = mongoose.model('ordres', postschema)

module.exports = Ordre