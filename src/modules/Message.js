const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({

 senderId:{ type:mongoose.Schema.Types.ObjectId , ref:'usedata' ,required:true  },
 receverId:{ type:mongoose.Schema.Types.ObjectId , ref:'usedata' ,required:true    },
 text:{type:String ,required:true  }

});

module.exports = mongoose.model('Message', messageSchema);