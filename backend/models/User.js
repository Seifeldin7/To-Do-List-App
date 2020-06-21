const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const todoSchema = require('../models/todos');
const UserSchema = new Schema({
    handle: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    todos: [todoSchema]
    
});

User = mongoose.model('User', UserSchema);
module.exports = User