//Coden er hentet fra Margo-Solutions/Margo-Cart/Server/Server/utils
//jwt = json web token
//generer en token 
//holder bruker innlogget i en time, etter 1t blir brukeren kastet ut og må logge inn igjen
const jwt = require('jsonwebtoken');
require ('dotenv').config();

function jwtGenerator(user_id) {
    const payload = {
        user: user_id
    };

    return jwt.sign(payload, process.env.jwtSecret, {expiresIn: "1hr"});
}

module.exports = jwtGenerator;