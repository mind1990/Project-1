const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MemorySchema = new Schema ({
  title: String,
  name: String,
  description: String,
  image: String,
  date: String
});

const Memory = mongoose.model('Memory', MemorySchema);
module.exports = Memory;
