const Schema = require('../modules/UserSchema')
require('dotenv').config()
const jwt=require('jsonwebtoken')

exports.user = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = req.body;

        if (!name || !email || !password) {
            return res.status(400).send({ status: false, msg: 'plzz entered ' })
        }
        const saveUser = await Schema.create(user);
        return res.send({ data: saveUser, status: true, msg: 'User registered successfully' });

    } catch (e) { return res.status(500).send({ status: false, msg: e.message }) }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for missing email or password
        if (!email || !password) {
            return res.status(400).send({ status: false, msg: 'Email and password must be entered.' });
        }

      
        
        const Checkmail = await Schema.findOne({ email: email });


        if (!Checkmail) {
            return res.status(400).send({ status: false, msg: 'Email not found.' });
        }

        
        if (Checkmail.email !== email) {
            return res.status(400).send({ status: false, msg: 'Email does not match.' });
        }

        const token = jwt.sign({ userid:Checkmail._id } , process.env.token , {expiresIn:'12h'} )

        const newdata= {
            token:token,
            id:Checkmail._id
        }
      
        return res.send({   data:newdata , status: true, msg: 'Login successfully.' });

    } catch (e) {
        
        res.status(500).json({ msg: e.message });
    }
};
