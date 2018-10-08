const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
  userName: String,
  password: String,
  profilePic: String,
  age: Number
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
