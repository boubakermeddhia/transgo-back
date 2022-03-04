const jwt=require('jsonwebtoken')

const Auth=async(req,res,next)=>{

  try {
            const char= await req.headers.authorization.split(" ")[1]
            var token=char.split('-')[0]
            let secure=char.split('-')[char.split('-').length-2]
            let decodedata
            let condition =char.split('-',char.split('-').length-2)

            if(condition.length>2){
                for(let i=1;i<condition.length;i++){
                    token=token+'-'+char.split('-')[i]
               }
               
            }
             if (token){
                 decodedata= jwt.verify(token,secure)
                 req.userid=decodedata.id
             }
             next()
         } catch (error) {
            res.json({message:"please login",status:403})
    }
}

module.exports=Auth