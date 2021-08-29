const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const metadata = require('./metadata');
const moment = require('moment');
const { Double } = require('mongodb');


const Schema = mongoose.Schema;

const LiveToLive = new Schema({
    type: {
        type: String,
        default: ''
    },
    weight: {
        type: Number,
        default: 0.0
    },
    
    farmerQuote: {
        type: Number,
        default: 0.0
    },
    ourQuote: {
        type: Number,
        default: 0.0
    },
    inQueue: {
        type: String,
        default: ''
    },
    finalAmount: {
        type: Number,
        default: 0.0
    },
    
    
    isActive: {
        type: Boolean,
        default: true
    },
    quoterMobileNo: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
});

const finalLiveToLiveSchema = new Schema({

    mobileNo: {
        type: String,
        default: ''
    },
    data: [LiveToLive],
    metadata:metadata.metaData
});


module.exports = mongoose.model('LiveToLive', finalLiveToLiveSchema,);