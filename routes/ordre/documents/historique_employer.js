module.exports = ({ user, l }) => {
    const today = new Date();
    const uriqrcode = "https://barcode.tec-it.com/barcode.ashx?data=" + "55555" + "&code=MobileQRCode"
    var text = ''
    let somme = 0
    let somme_total = 0
    let v = l.filter(res => res.status == "Livrée")
    for (let i = 0; i < v.length; i++) {
        if (v[i].frais_inclus) {
            somme_total = somme_total + Number(v[i].prix) * Number(v[i].qte) + Number(v[i].frais_sup)
        } else {
            somme_total = somme_total + Number(v[i].prix) * Number(v[i].qte) + Number(v[i].frais_sup) + Number(v[i].frais_colis)
        }
    }
    for (let i = 0; i < l.length; i++) {
        if (l[i].frais_inclus) {
            somme = Number(l[i].prix) * Number(l[i].qte) + Number(l[i].frais_sup)
        } else {
            somme = Number(l[i].prix) * Number(l[i].qte) + Number(l[i].frais_sup) + Number(l[i].frais_colis)
        }
        let uricodeabaree = "https://barcode.tec-it.com/barcode.ashx?data=" + `${l[i]._id}` + "&code=Code128&translate-esc=on"
        text = text + "<tr>" + "<th>" + String(i + 1) + "</th>" + "<th><br>" + `<img src=${uricodeabaree} style="width:80%;">` + "</th>" + "<th>" + l[i].status + "</th>" + "<th>" + l[i].name + "</th>" + "<th>" + l[i].adresse + "</th>" + "<th>" + l[i].numerotel + "</th>" + "<th>" + l[i].naturecolis + "</th>" + "</th>" + "</th>" + "<th>" + String(somme) + "</th>" + "</tr>"
        somme = 0
    }
    return `
   <!DOCTYPE html>
   <html>
   <style>
   table, th, td {
     border:1px solid black;
     font-size: 9px;
   }
   </style>
   <body>
   <img  src="https://i.postimg.cc/Gh8cMKJT/mts.jpg" alt="mts" border="0"
       style="width:50%; max-width:200px; position: absolute; left: 370px;" >
   <h5>Historique de Livrasion</h5>
   <h6> Date : ${`${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`}</h6>
   <br>
   <h5><b>Livreur :</b> ${user.name}, Téléphone : ${user.numerotel}, Adresse :${user.adresse}, Matricule :${user.matricule}</h5>
   <h5>Prix Total : ${somme_total} TND</h5>
   <h5>Nombre de Colis : ${l.length} Colis</h5>
   <table style="width:100%">
     <tr>
     <th>Num</th>
     <th>Ean</th>
     <th>Status</th>
     <th>Nom et Prénom</th>
     <th>Adresse</th>
     <th>Numéro telephone</th>
     <th>Désignation</th>
     <th>Prix Total</th>
     </tr>
     ${text}
   </table>
   </body>
   </html>
   `

};