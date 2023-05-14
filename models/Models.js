
import { dataTypes, sequelize } from "../loadSequelize.js";

export const seq = sequelize;

export const Users = sequelize.define('Users', {
    first_name: dataTypes.STRING,
    last_names: dataTypes.STRING,
    email: dataTypes.STRING,
    profile_picture: dataTypes.STRING,
    phone_number: dataTypes.STRING,
    bio: dataTypes.STRING,
    password: dataTypes.STRING,
}, { tableName: 'users', timestamps: false });


export const Spaces = sequelize.define('Spaces', {
    name: dataTypes.STRING,
    address: dataTypes.STRING,
    capacity: dataTypes.STRING,
    price: dataTypes.FLOAT,
    description: dataTypes.STRING,
    rules: dataTypes.STRING,
    space_picture: dataTypes.STRING,
    rid_host_user: dataTypes.INTEGER,
    lat: dataTypes.FLOAT,
    long:dataTypes.FLOAT,
    status: dataTypes.STRING,
}, { tableName: 'spaces', timestamps: false });


export const Bookings = sequelize.define('Bookings', {
    date_from: dataTypes.DATE,
    date_to: dataTypes.DATE,
    status: dataTypes.INTEGER,
    payment_method: dataTypes.STRING,
    message: dataTypes.STRING,   
    rid_booker_user: dataTypes.INTEGER,
    rid_space: dataTypes.INTEGER,
}, { tableName: 'bookings', timestamps: false });


export const Dates = sequelize.define('Dates', {
    date: dataTypes.DATE,
    available: dataTypes.STRING, 
    spaces_id_space: dataTypes.INTEGER
}, { tableName: 'dates', timestamps: false });


export const Preferences = sequelize.define('Preferences', {
    preference_name: dataTypes.STRING,
}, { tableName: 'preferences', timestamps: false });


export const Services = sequelize.define('Services', {
    name: dataTypes.STRING,
}, { tableName: 'services', timestamps: false });

export const SpaceServices = sequelize.define('SpaceServices', {
    rid_space: dataTypes.INTEGER,
    rid_service: dataTypes.INTEGER
    
}, { tableName: 'space_services', timestamps: false });


