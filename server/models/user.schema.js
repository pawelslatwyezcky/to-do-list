import mongoose from 'mongoose';
import { todoSchema } from './todo.schema.js';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
  },
  todoList: {
    type: [todoSchema],
    default: [],
  },
});

export const User = mongoose.model('User', userSchema);
