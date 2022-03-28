module.exports = ({ user, order }) => {
   const today = new Date();
   const uricodeabaree = "https://barcode.tec-it.com/barcode.ashx?data=" + `${order._id}` + "&code=Code128&translate-esc=on"
   const uriqrcode = "https://barcode.tec-it.com/barcode.ashx?data=" + `${order._id}` + "&code=MobileQRCode"
   var somme = 0
   var frais = 0
   if (order.frais_inclus) {
      somme = Number(order.prix) * Number(order.qte) + Number(order.frais_sup)
      frais = 0
   } else {
      somme = Number(order.prix) * Number(order.qte) + Number(order.frais_sup) + Number(order.frais_colis)
      frais = Number(order.frais_colis)
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
         color: black;
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
      <div class="invoice-box">
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
                        <img   src="https://i.ibb.co/TLF5B8n/mts.jpg" alt="mts" border="0"
                        style="width:70%; max-width:200px;"> 
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
               <td>${order.name} </td>
            </tr>
            <tr class="item">
               <td>Telephone:</td>
               <td>${order.numerotel}</td>
            </tr>
            <tr class="item">
              <td>Address:</td>
              <td>${order.adresse}</td>
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
        <td>${order.naturecolis} </td>
     </tr>
     <tr class="item">
     <td>Prix Unitaire:</td>
     <td>${order.prix}</td>
         </tr>
     <tr class="item">
     <td>Quantite:</td>
     <td>${order.qte}</td>
         </tr>
         <tr class="item">
         <td>Frais de livraison:</td>
         <td>${frais}</td>
        </tr>
         <tr class="item">
 <td>Frais Suplémentaire:</td>
 <td>${order.frais_sup}</td>
</tr>
    <tr class="item">
       <td>Prix Total (Tous frais inclus) :</td>
       <td>${somme} TND</td>
    </tr>
        </table>
      </div> 
   </body>
</html>
`
};