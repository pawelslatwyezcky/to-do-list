import mongoose from 'mongoose';

export const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  image: String,
  deadline: Date,
  importance: String,
  area: [String],
  done: Boolean,
});
