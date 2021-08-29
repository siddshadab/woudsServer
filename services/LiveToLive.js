const express = require('express');
const router = express.Router();
const LivetoliveOrder = require('../models/LivetoliveOrder');
const moment = require('moment');
var geoip = require('geoip-country');

exports.postLiveToLive = async function(req,res){

         var ip = (req.headers['x-forwarded-for'] || '').split(',').pop().trim() || 
         req.socket.remoteAddress

         var ip = ip;
         var geo = geoip.lookup(ip);


    const { body } = req;
    console.log('body', body);

    const [{
        type,
        weight,
        mobileNo,
        farmerQuote,
        ourQuote,
        inQueue,
        finalAmount,
        isActive,
        quoterMobileNo,
        address,
    }] = body;


            const live = new LivetoliveOrder({
                mobileNo:body[0].mobileNo,
                data: body
             });
              

            
              live.save((err, data) => {
                 if(err){
                      res.send({
                         success: false,
                         message: "Error: Server Error",
                         messagecode: 1
                     });
                 }
                 else if(data){
                      res.send({
                         success: true,
                         message: "You data Is Saved",
                         messagecode: 3
                     });
                 }
              });

}

exports.getLiveToLive = async function(req,res){

    var mobileNo = req.query.mobileNo
    var userType = req.query.UserType
    if(mobileNo!==undefined){
        LivetoliveOrder.find({mobileNo:mobileNo}, function(err, data){
            console.log(">>>> " + data );
            res.send({
                data
            });
        });
    }else if(userType==='Admin'|| userType==='Farmer' ){
        LivetoliveOrder.find({}, function(err, data){
            console.log(">>>> " + data );
            res.send({
                data
            });
        });
    }else{
        res.send({
            message: "Error Calling service",
            messagecode: 3
        }); 
    }
    
}
