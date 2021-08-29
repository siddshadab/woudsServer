const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const metadata = require('./metadata');
const moment = require('moment');


const Schema = mongoose.Schema;

const BiddingChatsSchema = new Schema({
    email: {
        type: String,
        default: ''
    },
    sender: {
        type: String,
        default: ''
    },
    reciever: {
        type: String,
        default: ''
    },
    message: {
        type: String,
        default: ''
    },
   
    status: {
        type: String,
        default: ''
    },
    metadata:metadata.metaData
});



module.exports = mongoose.model('BiddingChats', BiddingChatsSchema);