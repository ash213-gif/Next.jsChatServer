const  conversationmodel  = require('../modules/conversation');
const  messageSchema  = require('../modules/Message');

exports.sendmessage = async (req, res) => {
    try {
        const { SenderId, RecevierId, message } = req.body;
        if (!SenderId || !RecevierId || !message) {
            return res.status(400).send({ status: false, msg: 'All fields are required' });
        }

        const newMessage = new messageSchema({
            userId: SenderId,
            message
        });

        const savemessage = await newMessage.save();

        let conversation = await conversationmodel.findOne({
            participants: { $all: [SenderId, RecevierId] }

        });

        if (conversation) {
            conversation = await conversationmodel.findByIdAndUpdate(
                conversation._id,
                { $push: { message: [savemessage._id] } },
                { new: true }
            );
        } else {
            // Create new conversation if not exists
            conversation = await conversationmodel.create({
                participants: [SenderId, RecevierId],
                message: [savemessage._id]
            });
        }

        return res.status(200).send({ status: true, msg: 'Message sent', data: savemessage });

    } catch (e) {
        return res.status(500).send({ msg: e.message });
    }
}