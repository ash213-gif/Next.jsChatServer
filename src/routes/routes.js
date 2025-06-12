const express =require('express')
const router  =express.Router()
const {login , user}=require('../Controller/User')
const {MiddleAuth} =require('../middleware/middlewareUser')
const multer =require('multer')

const storage = multer.diskStorage({ path:'profileimg' })
const upload = multer({ storage: storage })


router.post('/signup' , upload.single('profileimg') , MiddleAuth , user)
router.post('/login' , login)


module.exports=router 