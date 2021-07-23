const router = require('express').Router();
const { Cities, Region, Countries } = require('../../conexion')
const { check, validationResult } = require('express-validator');
const { checkToken, isAdmin } = require("../../middlewares/checkToken")

// METODO POST: CREAR REGION

router.post('/', [
    check("name", "Name is mandatory.").not().isEmpty(),
],  checkToken, async (request, response) => { 

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        return response.status(400).json({ errores: errors.array() });
    }

    let regionBody = {
        name: request.body.name,
    }

    const region = await Region.create(regionBody);
    response.json(region);
})

// METODO GET: OBTENER REGIONES

router.get('/' , checkToken, async (request, response) => {
    const region = await Region.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
        include: [
            {
                model: Countries,
                as: "Countries",
                attributes: { exclude: ["createdAt", "updatedAt", "region"] },
                include: [
                    {
                        model: Cities,
                        as: "Cities",
                        attributes: { exclude: ["createdAt", "updatedAt", "country"] },
                    }
                ]
            }
        ]
    })
    response.send(region)
})

// METODO DELETE: ELIMINAR REGION

router.delete('/:id', checkToken, async (request, response) => {
    await Region.destroy({
        where: { id_region: request.params.id}
    })
    response.json({ success: "Region has been removed."})
})

// METODO PUT: ACTUALIZAR REGION

router.put('/:id', checkToken, async (request, response) => {

    await Region.update(request.body, {
        where: { id_region: request.params.id }
    });
    response.json({ success: "Region has been updated."})
})



module.exports = router;