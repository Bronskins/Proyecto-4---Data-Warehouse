const router = require('express').Router();
const { Media, ContactsMedia, Channels, Preferences, Countries, Contacts, Companies, Roles, Region, Cities } = require('../../conexion')
const { check, validationResult } = require('express-validator');
const { checkToken, isAdmin } = require("../../middlewares/checkToken");
const { request, response } = require('express');
let validation;

// METODO POST: CREAR CONTACTO

router.post('/', [
    check("firstName", "First Name is mandatory.").not().isEmpty(),
    check("lastName", "Last Name is mandatory.").not().isEmpty(),
    check("email", "Email is mandatory.").not().isEmpty(),
    check("address", "Address is mandatory.").not().isEmpty(),
    check("interest", "Interest is mandatory.").not().isEmpty(),
    check("company", "Company is mandatory.").not().isEmpty(),
    check("role", "Role is mandatory.").not().isEmpty(),
    check("city", "City is mandatory.").not().isEmpty(),
],  checkToken, async (request, response) => { 

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        return response.status(400).json({ errores: errors.array() });
    }

    let contactBody = {
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        interest: request.body.interest,
        company: request.body.company,
        role: request.body.role,
        city: request.body.city,
        address: request.body.address
    }

    const contact = await Contacts.create(contactBody);
    response.json(contact);
})

// METODO POST: CREAR MEDIA

router.delete('/media/:id', checkToken, async (request, response) => {

    await ContactsMedia.destroy({
        where: { id_contacts: request.params.id }
    })


    response.json({ success: "Media has been removed."})
})


router.post('/media', [
    check("channeldetail", "El usuario del canal es mandatorio.").not().isEmpty(),
    check("preferences", "La preferencia es mandatoria").not().isEmpty(),
    check("channels", "El canal de contacto es mandatorio.").not().isEmpty()
], checkToken, async (request, response) => {

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        return response.status(400).json({ errores: errors.array() });
    }


        let mediaBody = {
            channeldetail: request.body.channeldetail,
            preferences: request.body.preferences,
            channels: request.body.channels
        }

        const media = await Media.create(mediaBody)

        const contactMedia = await ContactsMedia.create({
            id_media: media.id_media,
            id_contacts: request.body.id_contacts
            })
    
            response.json(media) 



})

// METODO GET: OBTENER CONTACTOS

router.get('/' , checkToken, async (request, response) => {
    const contact = await Contacts.findAll({
        attributes: { exclude: ["createdAt", "updatedAt", "company", "role", "city"] },
      include: [
            {
                model: Cities,
                as: "City",
                attributes: { exclude: ["createdAt", "updatedAt"] },
                include: [
                    {
                    model: Countries,
                    as: "Country",
                    attributes: { exclude: ["createdAt", "updatedAt", "country", "region"] },
                    include: [
                        {
                        model: Region,
                        as: "Region",
                        attributes: { exclude: ["createdAt", "updatedAt"] }
                        }
                    ]
                    }
                ]

            },
            {
                model: Roles,
                as: "Role",
                attributes: { exclude: ["createdAt", "updatedAt", "id_roles"] }

            },
            {

                model: Companies,
                as: "Company",
                attributes: { exclude: ["createdAt", "updatedAt", "id_companies", "city"] }

            },
            {
                model: Media,
                as: "Media",
                attributes: { exclude: ["createdAt", "updatedAt", "preferences", "channels"]},
                through: {
                    model: ContactsMedia,
                    attributes: { exclude: ["id_contacts", "id_media", "createdAt", "updatedAt"] }
                },
                include: [
                    {
                        model: Channels,
                        as: "Channel",
                        attributes: { exclude: ["createdAt", "updatedAt"] }
                    },
                    {
                        model: Preferences,
                        as: "Preference",
                        attributes: { exclude: ["createdAt", "updatedAt"] }
                    }
                ]
            }
        ] 
    })

    response.send(contact)
})

// METODO DELETE: BORRAR CONTACTO

router.delete('/:id', checkToken, async (request, response) => {

    await ContactsMedia.destroy({
        where: { id_contacts: request.params.id }
    })

    await Contacts.destroy({
        where: { id_contacts: request.params.id}
    })
    response.json({ success: "Contacts has been removed."})
})

// METODO PUT: ACTUALIZAR CONTACTO

router.put('/:id', checkToken, async (request, response) => {

    await Contacts.update(request.body, {
        where: { id_contacts: request.params.id }
    });
    response.json({ success: "Contacts had been updated."})
})

module.exports = router