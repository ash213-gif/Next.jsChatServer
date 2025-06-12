require('dotenv').config()
const jwt=require('jsonwebtoken')

const  isAuthentecate=(req,res,next)=>{
    try{
        const token = req.cookies.token;
        if(!token) { return res.status(400).send({ status:false , msg: 'user not authenticate ' }) }
        const decode = jwt.verify(token, process.env.token)
        next()

    }catch (e) { return res.status(500).send({ status:false , msg : e.message }) }

}