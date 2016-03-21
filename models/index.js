var mongoose = require('mongoose');
mongoose.connect('mongodb://120.55.162.68/beike');
exports.User = mongoose.model('User',new mongoose.Schema({
    username:String,
    password:String,

}));