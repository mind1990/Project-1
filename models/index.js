const mongoose = require('mongoose');
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/scrapbook", {useNewUrlParser: true});

module.exports.Memory = require("./memory.js");
module.exports.User = require("./user.js");
