const mongoose = require('mongoose');
const moment = require('moment');

const metaData = {
    mcreateddt: {
        type: Date,
        default:moment.utc('2002-12-09')
    },
    mcreatedby: {
        type: String,
    }, 
    mlastupdatedt: {
        type: Date,
        default:moment.utc('2002-12-09')
    }, 
    mlastupdateby: {
        type: String,
        default: ''
    },
    mgeologd: {
        type: String,
        default: ''
    },
    mgeolatd: {
        type: String,
        default: ''
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
};

module.exports = {
    metaData
};