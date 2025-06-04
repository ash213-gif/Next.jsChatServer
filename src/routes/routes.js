const express =require('express')
const router  =express.Router()
const {login , user}=require('../Controller/User')

router.post('/login' , login)
router.post('/signup' , user)


module.exports=router 