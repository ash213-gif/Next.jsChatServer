const mongoose=require('mongoose')

const conversationmodel=new mongoose.Schema({
    participants:[{type:mongoose.Schema.Types.ObjectId , ref:'usedata' }],
    message:[{ type:mongoose.Schema.Types.ObjectId ,ref: 'Message' }]
})

module.exports = mongoose.model( 'Converstaion' , conversationmodel )
