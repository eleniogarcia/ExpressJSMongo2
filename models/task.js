// models/task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    geo: {
        lat: { type: Number, required: true },
        long: { type: Number, required: true }
    },
    start: { type: String, required: true },
    end: { type: String, required: true },
    status: { type: String, required: true }
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
