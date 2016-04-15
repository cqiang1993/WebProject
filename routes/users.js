var express = require('express');
var models = require('../models');
var crypto = require('crypto');
var async = require('async');
var router = express.Router();

function encrypt(content){
    return crypto.createHash('md5').update(content).digest('hex');
}

router.get('/validate',function(req,res){
    var userID = req.session.userID ;
    if(userID){
        models.User.findOne({_id:userID},function(err,user){
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
    req.session.userID = null;
    res.json({msg:"退出成功"});
});

router.post('/addStu',function(req,res){
    var id = req.body._id;
    if(id){
        models.Student.update({_id:id},{$set:{stuid:req.body.stuid,stuname:req.body.stuname,password:encrypt(req.body.password),role:'student',teacher:req.session.userID}},{},function(err,stu){
            if(err){
                res.status(500).json({msg:err});
            }else{
                res.status(200).json(stu);
            }
        })
    }else{
        new models.Student({stuid:req.body.stuid,stuname:req.body.stuname,password:encrypt(req.body.password),role:'student',teacher:req.session.userID,school:"福州大学至诚学院",specialty:"计算机科学与技术"}).save(function(err,stu){
            if(err){
                console.log(err);
                res.status(500).json({msg:err});
            }else{
                res.status(200).json(stu);
            }
        })
    }

});

router.get('/stulist',function(req,res){
    models.Student.find({teacher:req.session.userID},function(err,stus){
        if(err){
            res.status(500).json({msg:err});
        }else{
            res.status(200).json(stus);
        }
    })
});

router.post('/deleteStu',function(req,res){
    models.Student.remove({_id:req.body._id},function(err,result){
        if(err){
            res.status(500).json({msg:err});
        }else{
            res.status(200).json(result);
        }
    });
});

router.post('/batchDeleteStus',function(req,res){
    var _ids = req.body._ids;
    var tasks  = [];
    _ids.forEach(function(_id){
        tasks.push(function(callback){
            models.Student.remove({_id:_id},callback);
        });
    });
    async.parallel(tasks,function(err,result){
        if(err){
            res.json(500,{msg:err});
        }else{
            res.json(result);
        }
    });
});

router.post('/changePassword',function(req,res){
    console.log(req.session.userID);
    models.User.find({_id:req.session.userID,password:encrypt(req.body.old_password)},function(err,stu){
        if(err){
            res.status(500).json({msg:err});
        }else if(stu != ""){
            console.log(stu);
            models.User.update({_id:req.session.userID},
                {$set:{password:encrypt(req.body.password)}},
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
