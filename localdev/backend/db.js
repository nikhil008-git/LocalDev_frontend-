const mongoose = require('mongoose');
const { email } = require('zod');
const schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId

const userSchema = new schema({
email : { type : String , required : true, unique : true},
password : { type : String , required : true},
name : { type : String , required : true},

});

const userModel = mongoose.model('user',userSchema);

module.exports = {
    userModel
}