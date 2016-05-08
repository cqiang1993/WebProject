var mongoose = require('mongoose');
var Schema =mongoose.Schema;
var ObjectId = Schema.ObjectId;
exports.User = mongoose.model('User',new mongoose.Schema({
    username:String,//教师用户名
    password:String,//教师密码
    role:String, //角色:默认teacher
    course:String, //教师科目
    school:String,//学生的学校
    specialty:String//专业
}));
exports.Student = mongoose.model('Student',new mongoose.Schema({
    stuid:String,//学生学号
    stuname:String,//学生姓名
    password:String,//学生密码
    role:String,//角色:默认student
    school:String,//学生的学校
    specialty:String//专业
}));

exports.Exercise = mongoose.model('Exercise',new mongoose.Schema({
    title:String,//习题的题干
    A:String, B:String, C:String, D:String, //选项
    Answer:String, //答案
    Status:String, //状态:wait和online
    creator:String,//创建者
    school:String,//学校
    specialty:String,//专业
    course:String,//科目
    CountA:Number, CountB:Number, CountC:Number, CountD:Number//用于统计的
}));

exports.Detail = mongoose.model('Detail',new mongoose.Schema({
    questionId:String,//题目的id
    title:String,//题干
    stuId:String,//学生的学号
    Answer:String//学生提交的答案
}));