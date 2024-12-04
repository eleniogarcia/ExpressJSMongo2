const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  story: { type: mongoose.Schema.Types.ObjectId, ref: 'Story', required: true },
  created: { type: Date, default: Date.now },
  dueDate: { type: Date, required: false },
  done: { type: Boolean, default: false },
});

module.exports = mongoose.model('Task', taskSchema);
