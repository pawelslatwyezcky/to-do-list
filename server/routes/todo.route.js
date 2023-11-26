import express from 'express';
import {
  createTodo,
  deleteTodo,
  getAllTodo,
  updateTodo,
} from '../controllers/todo.controller.js';

const router = express.Router();

router.post('/create', createTodo);
router.post('/all', getAllTodo);
router.post('/update', updateTodo);
router.post('/delete', deleteTodo);

export default router;
