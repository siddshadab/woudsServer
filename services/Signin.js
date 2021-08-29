const express = require('express');
const router = express.Router();
const User = require('../models/User');
const UserSession = require('../models/UserSession');


exports.postSignIn = async function(req,res){

    console.log(req.body)
    if(!req.body.email){
         res.send({
            success: false,
            message: "Error: email field can't be blank"
        });
    }
    if(!req.body.password){
         res.send({
            success: false,
            message: "Error: password field can't be blank"
        });
    }

    var dbUser = null;
    email = req.body.email.toLowerCase();

    User.find({
        email: req.body.email
    },(err, users)=>{
        // console.log(users);
             if(err){
             res.send({
                success: false,
                message: 'Error: Server error'
            });
        }
        if(users.length != 1){
            // console.log(users);
            // console.log(users.length);
             res.send({
                success: false,
                message: 'Error: Invalid'
            });
        }

        const user = users[0];
        if(!user.validPassword(req.body.password)){
             res.send({
                success: false,
                message: 'Error: Invalid Password'
            });
        }

        // authentic user

        const userSession = new UserSession()
        userSession.userId = user._id;
        userSession.save((err, doc) => {
            if(err){
                 res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            }
            else if(doc){
                User.find({
                    email: req.body.email
                },(err, users)=>{
                 res.send({
                    success: true,
                    message: 'Valid sign in',
                    token: doc._id,
                    userId: doc._id,
                    userData: users,
                    /**Check this after words for proper if data exist 
                    for this user in database of business reg **/
                    isBusinessData: true
                });
            });
            }
        });

    });
}


exports.postMobileCheck = async function(req,res){

    console.log(req.body)
    if(!req.body.mobileno){
         res.send({
            success: false,
            message: "Error: Mobile field can't be blank"
        });
    }

    User.find({
        mobileno: req.body.mobileno
    },(err, users)=>{
        if(err){
             res.send({
                success: false,
                message: 'Error: Server error'
            });
        }
     
        if(users.length != 1){
            // console.log(users);
            // console.log(users.length);
             res.send({
                success: false,
                IsMobieAvalable: false
            });
        }else{
            res.send({
                success: true,
                IsMobieAvalable: true
            });
        }

    });

}