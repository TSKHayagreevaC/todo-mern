//todoList.js 
  
const mongoose = require('mongoose'); 
  
const todoSchema = new mongoose.Schema({ 
    todo: { 
        type: String, 
        required: true, 
    },
    assignee: {
        type: String,
        required: true,
    },
    status: { 
        type: String, 
        required: true, 
    }, 
    deadline: { 
        type: Date, 
    }, 
}); 
  
  
const todoList = mongoose.model("todo", todoSchema); 
  
module.exports = todoList;