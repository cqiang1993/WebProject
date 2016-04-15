var express = require('express');
var models = require('../models');
var crypto = require('crypto');
var async = require('async');
var router = express.Router();

function encrypt(content){
    return crypto.createHash('md5').update(content).digest('hex');
}

router.get('/validate',function(req,res){
    var stuID = req.session.stuID ;
    if(stuID){
        models.User.findOne({_id:stuID},function(err,user){
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

router.post('/login',function(req,res){
    models.Student.findOne({stuid: req.body.stuid,
        password: encrypt(req.body.password)},function(err,student){
        if(err){
            res.status(500).json({msg:err});
        }else{
            if(student){
                req.session.stuID = student._id;
                res.json(student);
            }else{
                res.status(401).json({msg:"此用户不合法"});
            }
        }
    });
});

router.post('/logout',function(req,res){
    req.session.stuID = null;
    res.json({msg:"退出成功"});
});




router.get('/student_info',function(req,res){
    models.Student.find({_id:req.session.stuID},function(err,stu){
        if(err){
            res.status(500).json({msg:err});
        }else{
            res.status(200).json(stu);
        }
    })
});

router.post('/changePassword',function(req,res){
    console.log(req.body.stuid);
    console.log(req.body);
    models.Student.find({stuid:req.body.stuid,password:encrypt(req.body.password)},function(err,stu){
        if(err){
            res.status(500).json({msg:err});
        }else if(stu != ""){
            console.log(stu);
            models.Student.update({stuid:req.body.stuid},
                {$set:{password:encrypt(req.body.new_password)}},
                {},function(err,result){
                if(err){
                    res.status(500).json({msg:err});
                }else{
                    res.status(200).json({msg:"密码修改成功"});
                }
            })
        }else{
            res.status(404).json({msg:"密码有误"});
        }
    })
});




module.exports = router;