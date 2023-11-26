import axios from 'axios'

const API = axios.create({
    baseURL: process.env.REACT_APP_GOOGLE_CLIENT_ID,
})

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${
            JSON.parse(localStorage.getItem('profile')).token
        }`
    }
    return req
})

export const signIn = (formData) => API.post('/auth/signin', formData)
export const signUp = (formData) => API.post('/auth/signup', formData)
export const googleSignIn = (code) => API.post('/auth/google', { code })

export const fetchTodoList = (user) => API.post('/todo/all', user)
export const createTodo = (user, formData) =>
    API.post('/todo/create', { ...user, ...formData })
export const updateTodo = (user, formData) =>
    API.post('/todo/update', { ...user, ...formData })
export const deleteTodo = (user, formData) =>
    API.post('/todo/delete', { ...user, ...formData })
