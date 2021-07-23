// De aca utilizamos el router para manejar los endpoints de nuestro servidor.

const router = require('express').Router();
const usersRoute = require('./api/users');
const channelsRoute = require('./api/channels');
const citiesRoute = require('./api/cities');
const companiesRoute = require('./api/companies');
const contactsRoute = require('./api/contacts');
const loginRoute = require("./api/login");
const regionRoute = require('./api/region');
const countriesRoute = require('./api/countries')

// http://localhost:4000/api/v1/channels

router.use('/users', usersRoute);

// http://localhost:4000/api/v1/channels

router.use('/channels', channelsRoute);

// http://localhost:4000/api/v1/cities

router.use('/cities', citiesRoute);

// http://localhost:4000/api/v1/companies

router.use('/companies', companiesRoute);

// http://localhost:4000/api/v1/region

router.use('/region', regionRoute);

// http://localhost:4000/api/v1/login

router.use('/login', loginRoute);

// http://localhost:4000/api/v1/countries

router.use('/countries', countriesRoute)

// http://localhost:4000/api/v1/contacts

router.use('/contacts', contactsRoute);

module.exports = router;