module.exports = ({ user, l }) => {
  const today = new Date();
  const uriqrcode = "https://barcode.tec-it.com/barcode.ashx?data=" + "55555" + "&code=MobileQRCode"
  var text = ''
  const somme_total = l.reduce((total, res) => (total = total + (Number(res.prix)*Number(res.qte))+Number(res.frais_colis)+Number(res.frais)), 0)
  for (let i = 0; i < l.length; i++) {
    let uricodeabaree = "https://barcode.tec-it.com/barcode.ashx?data=" + `${l[i]._id}` + "&code=Code128&translate-esc=on"
    text = text + "<tr>" + "<th><br>" + `<img src=${uricodeabaree} style="width:80%;">` + "</th>" + "<th>" + l[i].adresse + "</th>" + "</tr>"
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
 <img src="https://ml7r6wwlqi2t.i.optimole.com/aOggx0U-CP_OQ54l/w:auto/h:auto/q:auto/https://transgo.iamabdus.com/v1.1/wp-content/uploads/2019/11/trans-go-logo.svg"
     style="width:50%; max-width:200px; position: absolute; left: 370px;" >
 <h5>Bon de Livraison</h5>
 <h6> Date : ${`${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`}</h6>
 <br>
 <h5><b>Livreur :</b> ${user[0].name}, Téléphone : ${user[0].numerotel}, Adresse :${user[0].adresse}, Matricule :${user[0].matricule}</h5>
 <h5>Prix Total : ${somme_total} TND</h5>
 <h5>Nombre de Colis : ${l.length} Colis</h5>
 <table style="width:100%">
   <tr>
     <th>EAN</th>
     <th>Adresse</th>
   </tr>
   ${text}
 </table>
 </body>
 </html>
 `
};