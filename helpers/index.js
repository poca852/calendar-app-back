const { registerExisteEmail, 
        loginExisteEmail, 
        idValido,
        isDate,
        isEvent } = require('./db-validators');
        
const generarJWT = require('./generar-jwt');

module.exports = {
    registerExisteEmail,
    generarJWT,
    loginExisteEmail,
    idValido,
    isDate,
    isEvent
}