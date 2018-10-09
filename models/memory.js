const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MemorySchema = new Schema ({
  name: String,
  description: String,
  image: String,
  date: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Memory = mongoose.model('Memory', MemorySchema);
module.exports = Memory;
