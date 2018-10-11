const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
  username: String,
  password: String,
  profilePic: String,
  age: Number
});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', UserSchema);
module.exports = User;
