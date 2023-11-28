import { createSlice } from '@reduxjs/toolkit'

export const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todoList: [],
        loading: false,
    },
    reducers: {
        loading: (state) => {
            return {
                ...state,
                loading: true,
            }
        },
        updateList: (state, action) => {
            localStorage.setItem(
                'todoList',
                JSON.stringify({
                    data: [...action.payload],
                })
            )
            return {
                ...state,
                loading: false,
                todoList: action.payload,
            }
        },
    },
})

export const { loading, updateList } = todoSlice.actions

export default todoSlice.reducer
