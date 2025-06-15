const express=require('express')
const router=express.Router()
const {sendmessage} =require('../Controller/messageControl')

router.post('/sendmessage/:id', sendmessage);

module.exports = router;