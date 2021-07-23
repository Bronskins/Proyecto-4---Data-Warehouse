// Conexion a nuestra base de datos MySQL utilizando Sequelize para la creacion de la base y tablas.

const Sequelize = require('sequelize');
const ChannelsModel = require('./models/channels')
const CitiesModel = require('./models/cities')
const CompaniesModel = require('./models/companies');
const ContactsModel = require('./models/contacts')
const CountriesModel = require("./models/countries")
const RegionModel = require('./models/region')
const RolesModel = require("./models/roles")
const ProfilesModel = require("./models/profiles")
const UsersModel = require("./models/users");
const MediaModel = require("./models/media")
const PreferencesModel = require("./models/preferences")
const ContactsMediaModel = require("./models/contactMedia")

// Conexion a la base de datos.

const sequelize = new Sequelize("Proyecto4", "root", "acamica",{
    host: "localhost",
    dialect: "mysql"
});

// Mapeo de la tabla 'Users'

const Channels = ChannelsModel(sequelize, Sequelize)
const Cities = CitiesModel(sequelize, Sequelize)
const Companies = CompaniesModel(sequelize, Sequelize)
const Contacts = ContactsModel(sequelize, Sequelize)
const Countries = CountriesModel(sequelize, Sequelize)
const Region = RegionModel(sequelize, Sequelize)
const Roles = RolesModel(sequelize, Sequelize)
const Profiles = ProfilesModel(sequelize, Sequelize)
const Users = UsersModel(sequelize, Sequelize)
const Media = MediaModel(sequelize, Sequelize)
const Preferences = PreferencesModel(sequelize, Sequelize)
const ContactsMedia = ContactsMediaModel(sequelize, Sequelize)


Channels.hasOne(Media, {
    as: "Channel",
    foreignKey: "channels"
})

Media.belongsTo(Channels, {
    as: "Channel",
    foreignKey: "channels"
}) 

Region.hasMany(Countries, {
    as: "Countries",
    foreignKey: "region"
})

Countries.belongsTo(Region, {
    as: "Region",
    foreignKey: "region"
})

Countries.hasMany(Cities, {
    as: "Cities",
    foreignKey: "country"
})

Cities.belongsTo(Countries, {
    as: "Country",
    foreignKey: "country"
})

Users.belongsTo(Profiles,{
    as: "Profile",
    foreignKey: "profile"
})

Profiles.hasOne(Users,{
    as: "Users",
    foreignKey: "profile"
})

Contacts.belongsTo(Companies, {
    as: "Company",
    foreignKey: "company"
})

Companies.hasMany(Contacts, {
    as: "Contacts",
    foreignKey: "company"
})

Contacts.belongsTo(Roles, {
    as: "Role",
    foreignKey: "role"
})

Preferences.hasOne(Media, {
    as: "Preference",
    foreignKey: "preferences"
})

Media.belongsTo(Preferences, {
    as: "Preference",
    foreignKey: "preferences"
})


Roles.hasMany(Contacts, {
    as: "Contacts",
    foreignKey: "role"
})

Contacts.belongsTo(Cities,{
    as: "City",
    foreignKey: "city"
})

Companies.belongsTo(Cities,{
    as: "City",
    foreignKey: "city"
})


Media.belongsToMany(Contacts, {
    through: ContactsMedia,
    as: "Contacts",
    foreignKey: "id_media"
})

Contacts.belongsToMany(Media, {
    through: ContactsMedia,
    as: "Media",
    foreignKey: "id_contacts"
}) 

sequelize.sync({ alter: true }).then(() => {
    console.info('Las tablas fueron sincronizadas correctamente.')
}).catch(console.error)

module.exports = {
    Channels,
    Cities,
    Companies,
    Contacts,
    Countries,
    Region,
    Roles,
    Profiles,
    Users,
    Media,
    Preferences,
    ContactsMedia
}
