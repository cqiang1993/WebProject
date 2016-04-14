var express = require('express');
var models = require('../models');
var async = require('async');
var router = express.Router();
var countA=0,countB=0,countC=0,countD=0;

router.post('/list_details',function(req,res){
    console.log(req.body._id);
    models.Detail.find({questionId:req.body._id,Answer:"A"},function(err,result){
        if(err){
            console.log(err);
        }else if(result) {
            countA=result.length;
            console.log(countA);
            models.Detail.find({questionId:req.body._id,Answer:"B"},function(err,result){
                if(err){
                    console.log(err);
                }else if(result) {
                    countB=result.length;
                    console.log(countB);
                    models.Detail.find({questionId:req.body._id,Answer:"C"},function(err,result){
                        if(err){
                            console.log(err);
                        }else if(result) {
                            countC=result.length;
                            console.log(countC);
                            models.Detail.find({questionId:req.body._id,Answer:"D"},function(err,result){
                                if(err){
                                    console.log(err);
                                }else if(result){
                                    countD=result.length;
                                    console.log(countD);
                                    models.Exercise.update({_id:req.body._id},{$set:{CountA:countA,CountB:countB,CountC:countC,CountD:countD}},{},function(err,result){
                                        if(err){
                                            res.status(500).json({msg:err});
                                        }else if(result){
                                            res.status(200).json({CountA:countA,CountB:countB,CountC:countC,CountD:countD})
                                        }
                                    });
                                }
                            });
                        }
                    });

                }
            });
        }
    });




});


module.exports = router;
