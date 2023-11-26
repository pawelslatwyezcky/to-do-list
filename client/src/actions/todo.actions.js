import * as api from '../api';
import { loading, updateList } from '../store/todo.slice';

export const getAllTodo = (user) => async (dispatch) => {
  try {
    dispatch(loading());
    const { data } = await api.fetchTodoList(user);
    dispatch(updateList(data));
  } catch (error) {
    console.log('Get all todo failed: ', error);
  }
};

export const createTodo = (user, formData, navigate) => async (dispatch) => {
  try {
    dispatch(loading());
    const { data } = await api.createTodo(user, formData);
    dispatch(updateList(data));
    navigate('/todo');
  } catch (error) {
    console.log('Create todo failed: ', error);
  }
};

export const updateTodo = (user, formData, navigate) => async (dispatch) => {
  try {
    dispatch(loading());
    const { data } = await api.updateTodo(user, formData);
    dispatch(updateList(data));
    navigate('/todo');
  } catch (error) {
    console.log('Update todo failed: ', error);
  }
};

export const deleteTodo = (user, formData) => async (dispatch) => {
  try {
    const { data } = await api.deleteTodo(user, formData);
    dispatch(updateList(data));
  } catch (error) {
    console.log('Delete todo failed: ', error);
  }
};
