import mongoose from 'mongoose'; // Import Mongoose library
const { Schema } = mongoose; // Destructuring assignment to import Schema class from Mongoose

// Define the TodoItem schema
const TodoItemSchema = new Schema({
  task: {
    type: String, // Task description (string)
    required: true // Task is required
  },
  completed: {
    type: Boolean, // Completion status (boolean)
    default: false // Default value is false
  },
  created_at: {
    type: Date, // Creation date (date)
    default: Date.now // Default value is the current date/time
  }
});

// Define the TodoList schema
const TodoListSchema = new Schema({
  name: {
    type: String, // Name of the to-do list (string)
    required: true // Name is required
  },
  items: [TodoItemSchema], // Embedding TodoItem documents into TodoList as an array
  createdBy: {
    type: Schema.Types.ObjectId, // Reference to the user who created the to-do list (object id)
    ref: 'User' // Reference to the 'User' model
  }
});

// Create and export the TodoList model
const TodoList = mongoose.model('TodoList', TodoListSchema); // Create a Mongoose model named 'TodoList' based on the TodoListSchema

export default TodoList; // Export the TodoList model so it can be used in other parts of the application
