const Schema = require('../modules/UserSchema')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { UploadCloudary } = require('../cloudnary/Image')

exports.user = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const profileimg = req.file;
       
        if (!profileimg) {
            return res.status(400).send({ status: false, msg: 'profile image is required' });
        }

        if (!name || !email || !password) {
            return res.status(400).send({ status: false, msg: 'Please enter all required fields' });
        }

        const checkemail= await  Schema.findOne({email:email})
        if(checkemail) { return res.status(400).send({ status:false , msg:'email already exits ' }) }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Upload image to Cloudinary and get the URL
        let imageUrl = '';
        if (profileimg) {
            const url = await UploadCloudary(profileimg);
            imageUrl = url.secure_url;
        }

        const tempdata = {
            name: name,
            email: email,
            password: hashedPassword,
            profileimg: imageUrl
        };

        const saveUser = await Schema.create(tempdata);
        return res.status(201).send({ data: saveUser, status: true, msg: 'User registered successfully' });

    } catch (e) {
        return res.status(500).send({ status: false, msg: e.message });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ status: false, msg: 'Email and password must be entered.' });
        }

        const user = await Schema.findOne({ email: email });

        if (!user) {
            return res.status(400).send({ status: false, msg: 'Email not found.' });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ status: false, msg: 'Password does not match.' });
        }

        const token = jwt.sign({ userid: user._id }, process.env.token, { expiresIn: '12h' });

        const newdata = {
            token: token,
            id: user._id
        }

        return res.send({ data: newdata, status: true, msg: 'Login successfully.' });

    } catch (e) {
        return res.status(500).send({ msg: e.message });
    }
};