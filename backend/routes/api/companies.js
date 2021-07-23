const router = require('express').Router();
const { Cities, Region, Countries, Companies } = require('../../conexion')
const { check, validationResult } = require('express-validator');
const { checkToken, isAdmin } = require("../../middlewares/checkToken")

// METODO POST: CREAR REGION

router.post('/', [
    check("name", "Name is mandatory.").not().isEmpty(),
    check("city", "City is mandatory").not().isEmpty(),
    check('email', "Email is mandatory").not().isEmpty(),
    check("address", "Address is mandatory").not().isEmpty(),
    check("number", "Number is mandatory").not().isEmpty(),
],  checkToken, async (request, response) => { 

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        return response.status(400).json({ errores: errors.array() });
    }

    let companyBody = {
        name: request.body.name,
        city: request.body.city,
        email: request.body.email,
        address: request.body.address,
        number: request.body.number
    }

    const company = await Companies.create(companyBody);
    response.json(company);
})

// METODO GET: OBTENER PAISES

router.get('/' , checkToken, async (request, response) => {
    const company = await Companies.findAll({
        attributes: { exclude: ["createdAt", "updatedAt", "city"] },
        include: [
            {
                model: Cities,
                as: "City",
                attributes: { exclude: ["createdAt", "updatedAt", "id_cities", "country"] },
                include: [
                    {
                        model: Countries,
                        as: "Country",
                        attributes: { exclude: ["createdAt", "updatedAt", "id_countries", "region"] },
                        include: [
                            {
                                model: Region,
                                as: "Region",
                                attributes: { exclude: ["createdAt", "updatedAt", "id_region"] }
                            }
                        ]
                    }
                ]
            }
        ]
    })
    response.send(company)
})

// METODO DELETE: ELIMINAR PAIS

router.delete('/:id', checkToken, async (request, response) => {

    try {
    await Companies.destroy({
        where: { id_companies: request.params.id}
    })
    response.status(200).json({ success: "Company has been removed."})
    } catch (error) {
        response.status(400).json({error: "No se puede eliminar el registro."})
    }
})

// METODO PUT: ACTUALIZAR PAIS

router.put('/:id', checkToken, async (request, response) => {

    await Companies.update(request.body, {
        where: { id_companies: request.params.id }
    });
    response.json({ success: "Company has been updated."})
})



module.exports = router;