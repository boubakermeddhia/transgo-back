module.exports = ({ user, l }) => {
  const today = new Date();
  const uriqrcode = "https://barcode.tec-it.com/barcode.ashx?data=" + "55555" + "&code=MobileQRCode"
  var text = ''
  let somme = 0
  let somme_total = 0
  for (let i = 0; i < l.length; i++) {
    if (l[i].frais_inclus) {
      somme = Number(l[i].prix) * Number(l[i].qte) + Number(l[i].frais_sup)
      somme_total = somme_total + Number(l[i].prix) * Number(l[i].qte) + Number(l[i].frais_sup)
    } else {
      somme = Number(l[i].prix) * Number(l[i].qte) + Number(l[i].frais_sup) + Number(l[i].frais_colis)
      somme_total = somme_total + Number(l[i].prix) * Number(l[i].qte) + Number(l[i].frais_sup) + Number(l[i].frais_colis)
    }
    let uricodeabaree = "https://barcode.tec-it.com/barcode.ashx?data=" + `${l[i]._id}` + "&code=Code128&translate-esc=on"
    text = text + "<tr>" + "<th>" + String(i + 1) + "</th>" + "<th><br>" + `<img src=${uricodeabaree} style="width:80%;">` + "</th>" + "<th>" + l[i].fournisseur + "</th>" + "<th>" + l[i].name + "</th>" + "<th>" + l[i].adresse + "</th>" + "<th>" + l[i].numerotel + "</th>" + "<th>" + l[i].naturecolis + "</th>" + "</th>" + "</th>" + "<th>" + String(somme) + "</th>" + "</tr>"
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
 <img  src="https://www.linkpicture.com/q/mts.jpg" alt="mts" border="0"
     style="width:50%; max-width:200px; position: absolute; left: 370px;" >
 <h5>Bon de Livraison</h5>
 <h6> Date : ${`${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`}</h6>
 <br>
 <h5><b>Livreur :</b> ${user[0].name}, Téléphone : ${user[0].numerotel}, Adresse :${user[0].adresse}, Matricule :${user[0].matricule}</h5>
 <h5>Prix Total : ${somme_total} TND</h5>
 <h5>Nombre de Colis : ${l.length} Colis</h5>
 <table style="width:100%">
   <tr>
   <th>Num</th>
   <th>EAN</th>
   <th>Expéditeur</th>
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