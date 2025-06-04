const Message = require('../modules/Message');

exports.sendMessage = async (req, res) => {
  try {
    const message = new Message(req.body);
    await message.save();
    res.status(200).send({  status:true, msg: 'Message sent successfully' });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};



exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find()
      .populate('sender', 'name')
      .populate('receiver', 'name');
    res.send(messages);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};