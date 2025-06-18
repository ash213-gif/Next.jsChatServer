const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({

 userId:{ type:mongoose.Schema.Types.ObjectId , ref:'usedata' ,required:true  },
 message :{type:String ,required:true  }

});

module.exports = mongoose.model('Message', messageSchema);