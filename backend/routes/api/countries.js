const router = require('express').Router();
const { Cities, Region, Countries } = require('../../conexion')
const { check, validationResult } = require('express-validator');
const { checkToken, isAdmin } = require("../../middlewares/checkToken")

// METODO POST: CREAR REGION

router.post('/', [
    check("name", "Name is mandatory.").not().isEmpty(),
    check("region", "Region is mandatory.").not().isEmpty(),
],  checkToken, async (request, response) => { 

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        return response.status(400).json({ errores: errors.array() });
    }

    let countryBody = {
        name: request.body.name,
        region: request.body.region
    }

    const country = await Countries.create(countryBody);
    response.json(country);
})

// METODO GET: OBTENER PAISES

router.get('/' , checkToken, async (request, response) => {
    const country = await Countries.findAll({
        attributes: { exclude: ["createdAt", "updatedAt", "region"] },
        include: [
            {
                model: Region,
                as: "Region",
                attributes: { exclude: ["createdAt", "updatedAt", "id_region"] }
            },
            {
                model: Cities,
                as: "Cities",
                attributes: { exclude: ["createdAt", "updatedAt", "id_cities", "country"] }
            }
        ]
    })
    response.send(country)
})

// METODO DELETE: ELIMINAR PAIS

router.delete('/:id', checkToken, async (request, response) => {

    try{

    
    await Countries.destroy({
        where: { id_countries: request.params.id}
    })
    response.json({ success: "Country has been removed."})

    } catch (error) {
        console.error(error);
        return response.json({ error: "No se puede eliminar pais."})
    }
})

// METODO PUT: ACTUALIZAR PAIS

router.put('/:id', checkToken, async (request, response) => {

    await Countries.update(request.body, {
        where: { id_countries: request.params.id }
    });
    response.json({ success: "Country has been updated."})
})



module.exports = router;