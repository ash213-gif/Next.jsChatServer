const {conversationmodel} =require('../modules/conversation')
const {messageSchema}=require('../modules/Message')

exports.sendmessage= async  (req,res)=>{
     try{

          const SenderId=req.body;
          const RecevierId=req.params.id
          const {message}=req.body;

          let gotConversation= await conversationmodel.findOne({ participants: {$all: [SenderId,RecevierId] }})
          if(!gotConversation){ gotConversation =await conversationmodel.create({ participants: {$all: [SenderId,RecevierId] }}) }
          
          const newMessage = messageSchema.create({
               SenderId,
               RecevierId,
               message
          })

          if(newMessage){ gotConversation.message.push(newMessage._id)  }
          await gotConversation.save()


     }catch (e) {return res.status(500).send({ msg: e.message }); }
 
}