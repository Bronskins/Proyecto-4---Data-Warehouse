const router = require('express').Router();
const { Users, Profiles } = require('../../conexion')
const { check, validationResult } = require('express-validator');
const { checkToken, isAdmin } = require("../../middlewares/checkToken")
const bcrypt = require('bcryptjs');

// METODO POST: CREAR USUARIO

router.post('/', [
    check("username", "Username is mandatory.").not().isEmpty(),
    check("name", "Name is mandatory.").not().isEmpty(),
    check("lastName", "Last name is mandatory.").not().isEmpty(),
    check("email", "Email is mandatory.").isEmail(),
    check("password", "Password is mandatory.").not().isEmpty(),
    check("profile", "Profile is mandatory.").not().isEmpty(),
],  checkToken, isAdmin, async (request, response) => { 

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        return response.status(400).json({ errores: errors.array() });
    }
    request.body.password = bcrypt.hashSync(request.body.password, 10);

    let userBody = {
        username: request.body.username,
        name: request.body.name,
        lastName: request.body.lastName,
        email: request.body.email,
        password: request.body.password,
        profile: request.body.profile
    }

    const user = await Users.create(userBody);
    response.json(user);
})

// METODO GET: OBTENER USUARIOS

router.get('/' , checkToken, isAdmin, async (request, response) => {
    const users = await Users.findAll({
        attributes: { exclude: ["createdAt", "updatedAt", "profile"] },
        include: [
            {
                model: Profiles,
                as: "Profile",
                attributes: { exclude: ["createdAt", "updatedAt"] }
            }
        ]
    })
    response.send(users)
})

// METODO DELETE: ELIMINAR USUARIO

router.delete('/:id', checkToken, isAdmin, async (request, response) => {
    await Users.destroy({
        where: { id_users: request.params.id}
    })
    response.json({ success: "User has been removed."})
})

// METODO PUT: Actualizar Un Usuario (http://localhost:3000/usuarios/:id)

router.put('/:id', checkToken, isAdmin, async (request, response) => {

    await Users.update(request.body, {
        where: { id_users: request.params.id }
    });
    response.json({ success: "User has been updated."})
})

module.exports = router;