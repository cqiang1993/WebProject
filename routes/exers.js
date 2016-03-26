var express = require('express');
var models = require('../models');
var async = require('async');
var router = express.Router();

router.post('/addExer',function(req,res){
    var id = req.body._id;
    if(id){
        models.Exercise.update({_id:id},{$set:{title:req.body.title,A:req.body.A,B:req.body.B,C:req.body.C,D:req.body.D,
            Answer:req.body.Answer,Status:req.body.Status,creator:req.session.userID}},{},function(err,stu){
            if(err){
                res.status(500).json({msg:err});
            }else{
                res.status(200).json(stu);
            }
        })
    }else{
        new models.Exercise({title:req.body.title,A:req.body.A,B:req.body.B,C:req.body.C,D:req.body.D,
            Answer:req.body.Answer,Status:req.body.Status,creator:req.session.userID}).save(function(err,stu){
            if(err){
                console.log(err);
                res.status(500).json({msg:err});
            }else{
                res.status(200).json(stu);
            }
        })
    }

});

router.get('/exerlist',function(req,res){
    models.Exercise.find({},function(err,exers){
        if(err){
            res.status(500).json({msg:err});
        }else{
            res.status(200).json(exers);
        }
    })
});

router.get('/exerlist_online',function(req,res){
    models.Exercise.find({Status:"online"},function(err,exers){
        if(err){
            res.status(500).json({msg:err});
        }else{
            res.status(200).json(exers);
        }
    })
});

router.post('/deleteExer',function(req,res){
    models.Exercise.remove({_id:req.body._id},function(err,result){
        if(err){
            res.status(500).json({msg:err});
        }else{
            res.status(200).json(result);
        }
    });
});

router.post('/batchDeleteExers',function(req,res){
    var _ids = req.body._ids;
    var tasks  = [];
    _ids.forEach(function(_id){
        tasks.push(function(callback){
            models.Exercise.remove({_id:_id},callback);
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



module.exports = router;
