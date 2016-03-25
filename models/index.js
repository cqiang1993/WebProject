var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/beike');
exports.User = mongoose.model('User',new mongoose.Schema({
    username:String,
    password:String,
    role:String
}));