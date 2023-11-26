import { User } from '../models/user.schema.js';

export const getAllTodo = async (req, res) => {
  const { result } = req.body;
  const user = await User.findOne({ email: result.email });
  res.json(user.todoList);
};

export const createTodo = async (req, res) => {
  const {
    title,
    deadline,
    description,
    area,
    importance,
    done,
    image,
    result,
  } = req.body;
  const todo = {
    title,
    deadline,
    description,
    area,
    importance,
    done,
    image,
  };
  const user = await User.findOne({ email: result.email });
  user.todoList.push(todo);
  await user.save();
  res.json(user.todoList);
};

export const updateTodo = async (req, res) => {
  const {
    _id,
    title,
    deadline,
    description,
    area,
    importance,
    done,
    image,
    result,
  } = req.body;
  const user = await User.findOne({ email: result.email });
  const todo = user.todoList.id(_id);
  todo.title = title;
  todo.deadline = deadline;
  todo.description = description;
  todo.area = area;
  todo.importance = importance;
  todo.done = done;
  todo.image = image;

  await user.save();
  res.json(user.todoList);
};

export const deleteTodo = async (req, res) => {
  const { _id, result } = req.body;
  const user = await User.findOne({ email: result.email });
  if (user.todoList.id(_id)) user.todoList.id(_id).deleteOne();
  await user.save();
  res.json(user.todoList);
};
