const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const metadata = require('./metadata');
const moment = require('moment');


const Schema = mongoose.Schema;

const BusinessDetailsSchema = new Schema({
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    mobileno: {
        type: String,
        default: ''
    },
    groupcd: {
        type: String,
        default: ''
    },
    isloggedinyn: {
        type: String,
        default: ''
    },
    maxbadlginperday: {
        type: Number,
        default: 0
    },
    nextpwdchgdt: {
        type: Date,
        default:moment.utc('2002-12-09')
    },
    nextpwdchgdt: {
        type: Date,
        default:moment.utc('2002-12-09')
    },
    noofbadlogins: {
        type: Number,
        default: 0
    },
    reportinguser: {
        type: String,
        default: ''
    },
    usrdesignation: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        default: ''
    },
    metadata:metadata.metaData
});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

UserSchema.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);