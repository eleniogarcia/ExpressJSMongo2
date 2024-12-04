const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  description: { type: String, required: false },
  icon: { type: String, required: false },
});

module.exports = mongoose.model('Project', projectSchema);
