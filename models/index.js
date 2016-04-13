var mongoose = require('mongoose');
var Schema =mongoose.Schema;
var ObjectId = Schema.ObjectId;
exports.User = mongoose.model('User',new mongoose.Schema({
    username:String,
    password:String,
    role:String
}));
exports.Student = mongoose.model('Student',new mongoose.Schema({
    stuid:String,
    stuname:String,
    password:String,
    role:String,
    teacher:String,
    school:String,
    specialty:String
}));

exports.Exercise = mongoose.model('Exercise',new mongoose.Schema({
    title:String,
    A:String,
    B:String,
    C:String,
    D:String,
    Answer:String,
    Status:String,
    creator:String,
    CountA:Number,
    CountB:Number,
    CountC:Number,
    CountD:Number
}));

exports.Detail = mongoose.model('Detail',new mongoose.Schema({
    questionId:String,
    title:String,
    stuId:String,
    Answer:String
}));