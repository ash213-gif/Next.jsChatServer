const { Validnaame, Validemaaail, Validpaaassword } = require('../regex/regex')
const Schema = require('../modules/UserSchema')

exports.MiddleAuth = async (req, res, next) => {
    try {

        const { name, email, password } = req.body


        if (!name) { return res.status(400).send({ status: false, msg: 'name is required' }) }
        if (!Validnaame(name)) { return res.status(400).send({ status: false, msg: 'please enter valid name' }) }

        if (!email) {
            return res.status(400).send({ status: false, msg: 'email is required' })
        }
        if (!Validemaaail(email)) {
            return res.status(400).send({ status: false, msg: 'please enter valid email' })
        }

        if (!password) {
            return res.status(400).send({ status: false, msg: 'password is required' })
        }
        if (!Validpaaassword(password)) {
            return res.status(400).send({ status: false, msg: 'please enter valid password' })
        }
    } catch (e) { return res.status(500).send({ status: false, msg: e.message }) }

    next();
}