import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './todo.slice'
import authReducer from './auth.slice'
import pageReducer from './page.slice'

const store = configureStore({
    reducer: {
        todo: todoReducer,
        auth: authReducer,
        page: pageReducer,
    },
})

export default store
