const router = require('express').Router();
const { Cities, Region, Countries, Channels } = require('../../conexion')
const { check, validationResult } = require('express-validator');
const { checkToken, isAdmin } = require("../../middlewares/checkToken")

// METODO POST: CREAR REGION

router.post('/', [
    check("name", "Name is mandatory.").not().isEmpty(),
],  checkToken, isAdmin, async (request, response) => { 

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        return response.status(400).json({ errores: errors.array() });
    }

    let channelBody = {
        name: request.body.name,
    }

    const channel = await Channels.create(channelBody);
    response.json(channel);
})

// METODO GET: OBTENER REGIONES

router.get('/' , checkToken, async (request, response) => {
    const channel = await Channels.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
    })
    response.send(channel)
})

// METODO DELETE: ELIMINAR CHANNEL

router.delete('/:id', checkToken, isAdmin, async (request, response) => {
    await Channels.destroy({
        where: { id_channels: request.params.id}
    })
    response.json({ success: "Channel has been removed."})
})

// METODO PUT: ACTUALIZAR CHANNEL

router.put('/:id', checkToken, isAdmin, async (request, response) => {

    await Channels.update(request.body, {
        where: { id_channels: request.params.id }
    });
    response.json({ success: "Channel has been updated."})
})


module.exports = router;