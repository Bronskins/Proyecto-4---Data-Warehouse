const jwt = require('jsonwebtoken');
const moment = require('moment');
const { Users } = require('../conexion')

const checkToken = async (request, response, next) => {
    
    let userToken = request.headers['user-token']

    if(!userToken){
        return response.status(400).json(" { error: Falta el JSON Web Token. }")
    }

    let payload = {};

    payload = await jwt.decode(userToken, {complete: true});

    try 
    {
        if(payload.expireAt < moment().unix) {
            return response.json({ error: 'El JSON WEB Token esta expirado.'});
        } else {
            next();
        }


    } catch (error){
        console.error(error);
        return response.json({ error: "Error al validar usuario."})
    }
}

const isAdmin = async (request, response, next) => {

    let userToken = request.headers['user-token']
    
    let payload = {};

    payload = await jwt.decode(userToken, {complete: true});
    
    try 
    {
        let user = await Users.findOne({
        where: {username: payload.payload.username}
        })

        console.log(user)

        if (user.profile != 2) {
            console.log(user.profile)
            return response.json( { error: "No tienes permisos de administrador."})
        } else {
            next();
        }
        
    } catch (error){
        console.error(error);
        return response.json({ error: "Error al validar usuario."})
    }

    

}


module.exports = { checkToken, isAdmin }

