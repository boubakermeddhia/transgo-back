module.exports = (l) => {
   const today = new Date();

   var text = ''
   for (let i = 0; i < l.length; i++) {
      let uricodeabaree = "https://barcode.tec-it.com/barcode.ashx?data=" + `${l[i]._id}` + "&code=Code128&translate-esc=on"
      let uriqrcode = "https://barcode.tec-it.com/barcode.ashx?data=" + `${l[i]._id}` + "&code=MobileQRCode"
      text = text + "<tr>" + "<th>" + `<img src=${uricodeabaree} style="width:80%;">` + "</th>" + "<th>" + l[i].name + "</th>" + "<th>" + l[i].adresse + "</th>" + "<th>" + l[i].numerotel + "</th>" + "<th>" + l[i].naturecolis + "</th>" + "<th>" + l[i].prix + " TND</th>" + "</tr>"
   }
   return `
<!DOCTYPE html>
<html>
<style>
table, th, td {
  border:1px solid black;
}
</style>
<body>
<h1>Bon de Sortie</h1>
<img src="https://ml7r6wwlqi2t.i.optimole.com/aOggx0U-CP_OQ54l/w:auto/h:auto/q:auto/https://transgo.iamabdus.com/v1.1/wp-content/uploads/2019/11/trans-go-logo.svg"
    style="width:100%; max-width:200px; position: absolute; left: 750px;" >
<h2> Date : ${`${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`}</h2>

<br>
<br>
<table style="width:100%">
  <tr>
    <th>EAN</th>
    <th>Nom et Prénom</th>
    <th>Adresse</th>
    <th>Numéro telephone</th>
    <th>Désignation </th>
    <th>Prix</th>
  </tr>
  ${text}
</table>
</body>
</html>
`
};