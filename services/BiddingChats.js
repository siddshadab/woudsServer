
const express = require('express');
const router = express.Router();
const BiddingChats = require('../models/BiddingChats');
const moment = require('moment');
var geoip = require('geoip-country');

exports.postChatsData = async function(req,res){



    const { body } = req;
    console.log('body', body);

    const {
        email,
        sender,
        reciever,
        message,
    } = body;

    const biddingChats = new BiddingChats();
    biddingChats.sender = sender;
    biddingChats.reciever = reciever;
    biddingChats.message = message;
    biddingChats.email = email;
     biddingChats.metadata.mcreatedby = email;
     biddingChats.metadata.mlastupdateby = email ;
     biddingChats.metadata.mcreateddt =  moment().valueOf();
     biddingChats.metadata.mlastupdatedt = moment().valueOf() ;
  
     biddingChats.save((err, biddingChat) => {
        if(err){
             res.send({
                success: false,
                message: "Error: Server Error",
                messagecode: 1
            });
        }
        else if(biddingChat){
             res.send({
                success: true,
                message: "You are welcome, Signed Up",
                messagecode: 3
            });
        }
    });

   }



exports.getChatsData = async function(req,res){

    var sender = req.query.sender
    var reciver = req.query.reciver
    if(sender!==undefined){
        //sender=admin and reciver = dummy
        //sender=dummy and reciver =admin
        BiddingChats.find(
            {$or: [
                { $or:[{sender: sender},{reciver: reciver}] },
                { $or: [{sender: reciver},{reciver: sender}] }
            ]}, function(err, data){
            console.log(">>>> " + data );
            res.send({
                data
            });
        });
    }else{
        res.send({
            message: "No Data",
            messagecode: 3
        }); 
    }
    
}
