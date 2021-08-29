const express = require('express');
const router = express.Router();
const User = require('../models/User');
const moment = require('moment');
var geoip = require('geoip-country');

exports.postSignUp = async function(req,res){

         var ip = (req.headers['x-forwarded-for'] || '').split(',').pop().trim() || 
         req.socket.remoteAddress

         var ip = ip;
                         var geo = geoip.lookup(ip);


    const { body } = req;
    console.log('body', body);

    const {
        fname,
        lname,
        password,
        groupcd
    } = body;

    let {
        email
    } = body;
    let {
        mobileno
    } = body;

    if(!fname){
        res.send({
            success: false,
            message: "Error: first name can't be blank"
        });
    }
    if(!lname){
        res.send({
            success: false,
            message: "Error: last name can't be blank"
        });
    }
    if(!email){
        res.send({
            success: false,
            message: "Error: email field can't be blank"
        });
    }
    if(!mobileno){
        res.send({
            success: false,
            message: "Error: Mobile field can't be blank"
        });
    }
    if(!password){
        res.send({
            success: false,
            message: "Error: password field can't be blank"
        });
    }
    if(!groupcd){
        res.send({
            success: false,
            message: "Error: Customer Type field can't be blank"
        });
    }
    
    email = email.toLowerCase();

    // Steps
    // 1 Verify email and mobile doesn't exist
    // 2 save

    User.find({
        email:email,mobileno:mobileno
    }, (err, previousUsers) => {
        if(err){
             res.send({
                success: false,
                message: "Error: Server Error",
                messagecode: 1
            });
        }else if (previousUsers.length > 0 ){
             res.send({
                success: false,
                message: "Error: Email/Mobile already exist",
                messagecode: 2
            });
        }else{
            if (previousUsers.length== 0 ){

             // Save the new user
             const newUser = new User();
             newUser.email = email;
             newUser.mobileno = mobileno;
             newUser.firstName = fname;
             newUser.lastName = lname;
             newUser.groupcd = groupcd;

              newUser.isloggedinyn = 'N';
              newUser.maxbadlginperday = 0;
              newUser.metadata.mcreatedby = fname+" "+ lname ;
              newUser.metadata.mlastupdateby = fname+" "+ lname ;
              newUser.metadata.mcreateddt =  moment().valueOf();
              newUser.metadata.mlastupdatedt = moment().valueOf() ;
              try{
                  
              newUser.metadata.mgeolatd = geo.range[0];
              newUser.metadata.mgeologd = geo.range[1];
              }catch(_){}

            //  newUser.lastName = lname;
            //  newUser.lastName = lname;
            //  newUser.lastName = lname;
            //  newUser.lastName = lname;
            //  newUser.lastName = lname;
            //  newUser.lastName = lname;
            //  newUser.lastName = lname;
            //  newUser.lastName = lname;
            //  newUser.lastName = lname;

             newUser.password = newUser.generateHash(password);
             newUser.save((err, user) => {
                 if(err){
                      res.send({
                         success: false,
                         message: "Error: Server Error",
                         messagecode: 1
                     });
                 }
                 else if(user){
                      res.send({
                         success: true,
                         message: "You are welcome, Signed Up",
                         messagecode: 3
                     });
                 }
             });

            }
        }
     
    });
}

