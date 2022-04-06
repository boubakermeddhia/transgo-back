module.exports = ({ user, l }) => {
  const today = new Date();
  const uriqrcode = "https://barcode.tec-it.com/barcode.ashx?data=" + "55555" + "&code=MobileQRCode"
  const somme_colis = l.length
  var somme = 0
  var somme_total = 0
  var text = ''

  for (let i = 0; i < somme_colis; i++) {

    if (l[i].frais_inclus) {
      somme_total = somme_total + Number(l[i].prix) * Number(l[i].qte) + Number(l[i].frais_sup)
    } else {
      somme_total = somme_total + Number(l[i].prix) * Number(l[i].qte) + Number(l[i].frais_sup) + Number(l[i].frais_colis)
    }
  }

  for (let i = 0; i < l.length; i++) {
    if (l[i].frais_inclus) {
      somme = somme + Number(l[i].prix) * Number(l[i].qte) + Number(l[i].frais_sup)
    } else {
      somme = somme + Number(l[i].prix) * Number(l[i].qte) + Number(l[i].frais_sup) + Number(l[i].frais_colis)
    }

      //  "https://barcodegen.labelcloud.net:1301/barcode?type=Code128&data=" + `${l[i]._id}` + "&format=PNG&partnerid=nicelabel"
      var uricodeabaree = "https://www.webarcode.com/barcode/image.php?code=" + `${l[i]._id}` + "&type=C128B&xres=1&height=80&width=362&font=3&output=png&style=196"
      // var uricodeabaree = "https://barcode.tec-it.com/barcode.ashx?data=" + `${l[i]._id}` + "&code=Code128&translate-esc=on"
  
    text = text + "<tr>" + "<th>" + String(i + 1) + "</th>" + "<th><br>" + `<img src=${uricodeabaree} style="width:80%;">` + "</th>" + "<th>" + l[i].name + "</th>" + "<th>" + l[i].adresse + "</th>" + "<th>" + l[i].numerotel + "</th>" + "<th>" + l[i].naturecolis + "</th>" + "</th>" + "<th>" + String(somme) + "</th>" + "</tr>"
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
<h5>Bon de Sortie</h5>
<h6> Date : ${`${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`}</h6>
<br>
<h5><b>Client(e):</b> ${user.name}, Téléphone: ${user.numerotel}, Adresse :${user.adresse}, MF/CIN :${user.matricule}</h5>
<h5>Nombre Total de Colis : ${somme_colis}</h5>
<h5>Somme Total : ${somme_total}</h5>
<table style="width:100%">
  <tr>
  <th>Num</th>
    <th>EAN</th>
    <th>Nom et Prénom</th>
    <th>Adresse</th>
    <th>Numéro telephone</th>
    <th>Désignation </th>
    <th>Prix Total</th>
  </tr>
  ${text}
</table>
</body>
</html>

`
};