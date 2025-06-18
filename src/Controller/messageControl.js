const { conversationmodel } = require('../modules/conversation')
const { messageSchema } = require('../modules/Message')

exports.sendmessage = async (req, res) => {
     try {

          const { SenderId,RecevierId,message } =req.body;

          if(!SenderId || !RecevierId || !message ) { return res.status(400).send({status:false, msg:`aal is  requires  `}) }

          let gotConversation = await conversationmodel.findOne({ participants: { $all: [SenderId, RecevierId] } })
          if (!gotConversation) { gotConversation = await conversationmodel.create({ participants: { $all: [SenderId, RecevierId] } }) }

          const newMessage = messageSchema.create({
               SenderId,
               RecevierId,
               message
          })

          if (newMessage) { gotConversation.message.push(newMessage._id) }
          await gotConversation.save()

          if (newMessage) { return res.status(400).send({ status: false, msg: 'message are required' }) }

     } catch (e) { return res.status(500).send({ msg: e.message }); }

}