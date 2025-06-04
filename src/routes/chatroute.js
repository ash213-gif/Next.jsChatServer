const express=require('express')
const router=express.Router()
const {getMessages,sendMessage} =require('../Controller/chatcontroller')

router.post('/sendmessage', sendMessage);
router.get('/getmessages', getMessages);

module.exports = router;