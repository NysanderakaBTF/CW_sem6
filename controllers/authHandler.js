
var bcrypt = require('bcryptjs');
const {sign} = require("jsonwebtoken");
 const getHashedPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

const generateJwt = (id, email, role) => {
    return sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

module.exports = {getHashedPassword, generateJwt}