var express = require('express');
var models = require('../models');
var crypto = require('crypto');
var router = express.Router();

function encrypt(content){
    return crypto.createHash('md5').update(content).digest('hex');
}

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

module.exports = router;
