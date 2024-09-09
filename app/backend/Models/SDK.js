const mongoose = require('mongoose');

const sdkSchema = new mongoose.Schema({
  name: { type: String, required: true },
  language: { type: String, required: true },
  code: { type: String, required: true },
  description: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const SDK = mongoose.model('SDK', sdkSchema);

module.exports = SDK;
