const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator');
const { Users, Profiles } = require('../../conexion')

router.post('/', [
    check("username", "Username is mandatory.").not().isEmpty(),
    check("password", "Password is mandatory.").not().isEmpty()
], async (request, response) => { 

    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ error: errors.array() });
    }

   let user = await Users.findOne({
        where: { username: request.body.username},
        include: [
            {
                model: Profiles,
                as: "Profile"
            }
        ]
    })
    if(!user){
        response.status(404).json({ error: "El usuario es incorrecto."})
    } else {
        bcrypt.compare(request.body.password, user.password , function(err, result){
            if(result){
                let token = jwt.sign({
                    username: request.body.username,
                }, request.body.password)
                let mensaje = {
                    token: token, 
                    profile: user.Profile.name
                }
                response.status(200).json(mensaje)
            } else {
                response.status(404).json( { error: "La contraseña es incorrecta."})
            }
        })
    }
});

module.exports = router;