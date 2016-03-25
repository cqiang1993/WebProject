var express = require('express');
var models = require('../models');
var crypto = require('crypto');
var router = express.Router();

function encrypt(content){
    return crypto.createHash('md5').update(content).digest('hex');
}

router.get('/validate',function(req,res){
    var userID = req.session.userID ;
    if(userID){
        db.User.findOne({_id:userID},function(err,user){
            if(err){
                res.status(401).json({msg:err});
            }else{
                res.json(user);
            }
        });
    }else{
        res.status(401).json({msg:err});
    }
});

router.post('/reg',function(req,res){
    var user = req.body;
    if(user.password == user.repassword){
        new models.User({username:user.username,password:encrypt(user.password),role:"teacher"}).save(function(err,result){
            if(err){
                res.json(500,{msg:err});
            }else{
                res.json(result);
            }
        })
    }
});

router.post('/login',function(req,res){
    var user = req.body;
    models.User.findOne({username: req.body.username, password: encrypt(req.body.password)},function(err,user){
        if(err){
            res.status(500).json({msg:err});
        }else{
            if(user){
                req.session.userID = user._id;
                res.json(user);
            }else{
                res.status(401).json({msg:"此用户不合法"});
            }
        }
    });
});

router.post('/logout',function(req,res){
    res.session.userID = null;
    res.json({msg:"退出成功"});
});




module.exports = router;
