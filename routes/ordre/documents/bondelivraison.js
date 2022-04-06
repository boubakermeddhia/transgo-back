
module.exports = ({ user, l }) => {
   const today = new Date();
   var somme = 0
   var frais = 0
   var text = ''
   for (let i = 0; i < l.length; i++) {

      if (l[i].frais_inclus) {
         somme = Number(l[i].prix) * Number(l[i].qte) + Number(l[i].frais_sup)
         frais = 0
      } else {
         somme = Number(l[i].prix) * Number(l[i].qte) + Number(l[i].frais_sup) + Number(l[i].frais_colis)
         frais = Number(l[i].frais_colis)
      }

      //  "https://barcodegen.labelcloud.net:1301/barcode?type=Code128&data=" + `${l[i]._id}` + "&format=PNG&partnerid=nicelabel"
      var uricodeabaree = "https://www.webarcode.com/barcode/image.php?code=" + `${l[i]._id}` + "&type=C128B&xres=1&height=80&width=362&font=3&output=png&style=196"
      // var uricodeabaree = "https://barcode.tec-it.com/barcode.ashx?data=" + `${l[i]._id}` + "&code=Code128&translate-esc=on"
      let uriqrcode = "https://barcode.tec-it.com/barcode.ashx?data=" + `${l[i]._id}` + "&code=MobileQRCode"

      text = text + `<div class="invoice-box">
      <table cellpadding="0" cellspacing="0">
         <tr class="top">
            <td colspan="2">
               <table>
                  <tr>
                     <td class="title">
                       <img  src=${uricodeabaree}
                       style="width:80%; max-width:400px;">
                        </td>
                     <td>
                     <div style="align-self:center">
                     <img src="https://www.linkpicture.com/q/mts.jpg" alt="mts" border="0"
                     style="width:50%; max-width:200px;"> 
                     </div>
                     </td>
                  </tr>
               </table>
            </td>
         </tr>
         <tr class="information">
            <td colspan="2">
               <table>
                  <tr>
                  <td>
                  <img  src=${uriqrcode}
                  style="width:60%; max-width:90px;">
                  </td>
                     <td>
                        Date : ${`${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`}
                     </td>
                  </tr>
               </table>
            </td>
         </tr>
         <tr class="heading">
            <td>Destinateur:</td>
            <td></td>
         </tr>
         <tr class="item">
            <td>Nom et prenom:</td>
            <td>${l[i].name} </td>
         </tr>
         <tr class="item">
            <td>Telephone:</td>
            <td>${l[i].numerotel}</td>
         </tr>
         <tr class="item">
           <td>Address:</td>
           <td>${l[i].adresse}</td>
        </tr>

        <tr class="heading">
         <td>Expediteur:</td>
         <td></td>
      </tr>
      <tr class="item">
      <td>Nom et prenom / Societe :</td>
      <td>${user.name}</td>
     </tr>
      <tr class="item">
      <td>Matricule Fiscale:</td>
      <td>${user.matricule}</td>
     </tr>
      <tr class="item">
         <td>Telephone:</td>
         <td>${user.numerotel}</td>
      </tr>
      <tr class="item">
        <td>Address:</td>
        <td>${user.adresse}</td>
     </tr>
     

    
    <tr class="heading">
     <td>Colis:</td>
     <td></td>
  </tr>
  <tr class="item">
     <td>Designation:</td>
     <td>${l[i].naturecolis} </td>
  </tr>
  <tr class="item">
    <td>Prix Unitaire:</td>
    <td>${l[i].prix}</td>
 </tr>
  <tr class="item">
    <td>Quantite:</td>
    <td>${l[i].qte}</td>
 </tr>
 <tr class="item">
 <td>Frais de Livraison:</td>
 <td>${frais} TND</td>
 </tr>
 <tr class="item">
 <td>Frais Supplémentaire:</td>
 <td>${l[i].frais_sup} TND</td>
 </tr>
  <tr class="item">
     <td>Prix Total :</td>
     <td>${somme} TND</td>
  </tr>

      </table>
   </div>
   <br><br><br>
   `
      somme = 0
      frais = 0
   }
   return `
<!doctype html>
<html>
   <head>
      <meta charset="utf-8">
      <title>PDF Result Template</title>
      <style>
         .invoice-box {
         max-width: 800px;
         margin: auto;
         padding: 10px;
         bl[i]: 1px solid #eee;
         font-size: 10px;
         line-height: 24px;
         font-family: 'Helvetica Neue', 'Helvetica';
         color: black;
         }
         .margin-top {
         margin-top: 10px;
         }
         .justify-center {
         text-align: center;
         }
         .invoice-box table {
         width: 100%;
         line-height: inherit;
         text-align: left;
         }
         .invoice-box table td {
         padding: 5px;
         vertical-align: top;
         }
         .invoice-box table tr td:nth-child(2) {
         text-align: right;
         }
         .invoice-box table tr.top table td {
         padding-bottom: 1px;
         }
         .invoice-box table tr.top table td.title {
         font-size: 45px;
         line-height: 45px;
         color: #333;
         }
         .invoice-box table tr.information table td {
         padding-bottom: 1px;
         }
         .invoice-box table tr.heading td {
         background: #eee;
         bl[i]-bottom: 1px solid #ddd;
         font-weight: bold;
         }
         .invoice-box table tr.details td {
         padding-bottom: 1px;
         }
         .invoice-box table tr.item td {
         bl[i]-bottom: 1px solid #eee;
         }
         .invoice-box table tr.item.last td {
         bl[i]-bottom: none;
         }
         .invoice-box table tr.total td:nth-child(2) {
         bl[i]-top: 2px solid #eee;
         font-weight: bold;
         }
         @media only screen and (max-width: 600px) {
         .invoice-box table tr.top table td {
         width: 100%;
         display: block;
         text-align: center;
         }
         .invoice-box table tr.information table td {
         width: 100%;
         display: block;
         text-align: center;
         }
         }
      </style>
   </head>
   <body>
     ${text}
   </body>
</html>
`
};