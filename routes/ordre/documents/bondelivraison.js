module.exports = ({ user, l }) => {
   const today = new Date();

   var text = ''
   for (let i = 0; i < l.length; i++) {
      let uricodeabaree = "https://barcode.tec-it.com/barcode.ashx?data=" + `${l[i]._id}` + "&code=Code128&translate-esc=on"
      let uriqrcode = "https://barcode.tec-it.com/barcode.ashx?data=" + `${l[i]._id}` + "&code=MobileQRCode"

      text = text + `<div class="invoice-box">
      <table cellpadding="0" cellspacing="0">
         <tr class="top">
            <td colspan="2">
               <table>
                  <tr>
                     <td class="title">
                       <img  src=${uricodeabaree}
                       style="width:50%; max-width:400px;">
                        </td>
                     <td>
                     <div style="align-self:center">
                     <img  src="https://ml7r6wwlqi2t.i.optimole.com/aOggx0U-CP_OQ54l/w:auto/h:auto/q:auto/https://transgo.iamabdus.com/v1.1/wp-content/uploads/2019/11/trans-go-logo.svg"
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
                  style="width:50%; max-width:90px;">
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
    <td>Poids:</td>
    <td>${l[i].poidcolis} KG</td>
 </tr>
  <tr class="item">
  <td>Frais de Livraison:</td>
  <td>7 TND</td>
  </tr>
  <tr class="item">
     <td>Prix brut:</td>
     <td>${Number(l[i].prix)} TND</td>
  </tr>
  <tr class="item">
     <td>Prix Total hors TTC:</td>
     <td>${Number(l[i].prix) + 7} TND</td>
  </tr>
  <tr class="item">
  <td>Prix Total avec TTC (19%):</td>
  <td>${Math.round((Number(order.prix)+7)*(1+0.19))} TND</td>
  </tr>
      </table>
   </div>
   <br>
   <br>
   <br>
   <br>
   `
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
         border: 1px solid #eee;
         box-shadow: 0 0 10px rgba(0, 0, 0, .15);
         font-size: 10px;
         line-height: 24px;
         font-family: 'Helvetica Neue', 'Helvetica';
         color: #555;
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
         border-bottom: 1px solid #ddd;
         font-weight: bold;
         }
         .invoice-box table tr.details td {
         padding-bottom: 1px;
         }
         .invoice-box table tr.item td {
         border-bottom: 1px solid #eee;
         }
         .invoice-box table tr.item.last td {
         border-bottom: none;
         }
         .invoice-box table tr.total td:nth-child(2) {
         border-top: 2px solid #eee;
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