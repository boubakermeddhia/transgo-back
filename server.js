const express=require('express')
const cors=require('cors')
const bodyparser=require('body-parser')
const mongoose=require('mongoose')
const routeruser=require('./routes/client/signclient')
const routerorder=require('./routes/ordre/ordre')
const routerordermobile=require('./routes/mobile/mobile_ordre')
const routerusermobile=require('./routes/mobile/mobile_user')
const routeradminclient=require('./routes/admin/client')
const routeradminemployer=require('./routes/admin/employer')
const routercolis=require('./routes/admin/colis')


const app=express()


app.use(bodyparser.json({limit:"30mb",extend:true}))
app.use(bodyparser.urlencoded({limit:"30mb",extended:true}))
app.use(cors())

app.use('/users',routeruser)
app.use('/order',routerorder)
app.use('/colis',routercolis)
app.use('/mobile/order',routerordermobile)
app.use('/mobile/user',routerusermobile)
app.use('/admin/client',routeradminclient)
app.use('/admin/employer',routeradminemployer)


const uri="mongodb+srv://dhia:dhia@cluster0.nkcjd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true });
const connection=mongoose.connection
connection.once('open',()=>{
    console.log("mongo db connection established successfully")
})

var port = process.env.PORT || 8080;
app.listen(port,'0.0.0.0',()=>{console.log('Server is running')})
