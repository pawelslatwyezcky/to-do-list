import * as api from '../api';
import { auth, loading, authError } from '../store/auth.slice';
import { closeModal } from '../store/page.slice';

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    dispatch(loading());
    const { data } = await api.signIn(formData);
    dispatch(auth(data));
    dispatch(closeModal());
    navigate('/todo');
  } catch (error) {
    console.log('Sign In failed: ', error);
    dispatch(authError(error?.response?.data?.message));
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    dispatch(loading());
    const { data } = await api.signUp(formData);
    dispatch(auth(data));
    dispatch(closeModal());
    navigate('/todo');
  } catch (error) {
    console.log('Sign Up failed: ', error);
    dispatch(authError(error?.response?.data?.message));
  }
};

export const googleSignIn = (code, navigate) => async (dispatch) => {
  try {
    dispatch(loading());
    const { data } = await api.googleSignIn(code);
    dispatch(auth(data));
    dispatch(closeModal());
    navigate('/todo');
  } catch (error) {
    console.log('Google sign in failed: ', error);
    dispatch(authError(error?.response?.data?.message));
  }
};
