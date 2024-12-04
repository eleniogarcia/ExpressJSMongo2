const mongoose = require('mongoose');

const epicSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
  name: { type: String, required: true },
  description: { type: String, required: false },
  icon: { type: String, required: false },
});

module.exports = mongoose.model('Epic', epicSchema);
