var express = require('express');
var models = require('../models');
var async = require('async');
var router = express.Router();


router.post('/list_details',function(req,res){
    models.Detail.find({questionId:req.body._id,Answer:"A"},function(err,result){
        if(err){
            console.log(err);
        }else if(result) {
            countA=result.length
        }
    });
    models.Detail.find({questionId:req.body._id,Answer:"B"},function(err,result){
        if(err){
            console.log(err);
        }else if(result) {
            countB=result.length
        }
    });
    models.Detail.find({questionId:req.body._id,Answer:"C"},function(err,result){
        if(err){
            console.log(err);
        }else if(result) {
            countC=result.length
        }
    });
    models.Detail.find({questionId:req.body._id,Answer:"D"},function(err,result){
        if(err){
            console.log(err);
        }else if(result){
            countD=result.length
        }
    });
    models.Exercise.update({_id:req.body._id},{$set:{CountA:countA,CountB:countB,CountC:countC,CountD:countD}},{},function(err,exer){
        if(err){
            res.status(500).json({msg:err});
        }else{
            res.status(200).json(exer);
        }
    });
});


module.exports = router;
