const router = require('express').Router();
const {
    Cities,
    Region,
    Countries
} = require('../../conexion')
const {
    check,
    validationResult
} = require('express-validator');
const {
    checkToken,
    isAdmin
} = require("../../middlewares/checkToken")

// METODO POST: CREAR CIUDAD

router.post('/', [
    check("name", "Name is mandatory.").not().isEmpty(),
    check("country", "Country is mandatory.").not().isEmpty(),
], checkToken, async (request, response) => {

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        return response.status(400).json({
            errores: errors.array()
        });
    }

    let cityBody = {
        name: request.body.name,
        country: request.body.country
    }

    const city = await Cities.create(cityBody);
    response.json(city);
})

// METODO GET: OBTENER CIUDADES

router.get('/', checkToken, async (request, response) => {
    const cities = await Cities.findAll({
        attributes: {
            exclude: ["createdAt", "updatedAt", "country"]
        },
        include: [{
            model: Countries,
            as: "Country",
            attributes: {
                exclude: ["createdAt", "updatedAt", "region", "id_countries"]
            },
            include: [{
                model: Region,
                as: "Region",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "id_region"]
                }
            }]
        }]
    })
    response.send(cities)
})

// METODO DELETE: ELIMINAR CIUDAD

router.delete('/:id', checkToken, async (request, response) => {
    try {
        await Cities.destroy({
            where: {
                id_cities: request.params.id
            }
        })
        response.json({
            success: "City has been removed."
        })
    } catch (error) {
        console.error(error);
        return response.json({
            error: "No se puede eliminar ciudad."
        })
    }
})

// METODO PUT: ACTUALIZAR CIUDAD

router.put('/:id', checkToken, async (request, response) => {

    try {
        await Cities.update(request.body, {
            where: {
                id_cities: request.params.id
            }
        });
        response.json({
            success: "City has been updated."
        })

    } catch (error) {
        console.error(error);
        return response.json({
            error: "No se puede eliminar ciudad."
        })
    }

})



module.exports = router;