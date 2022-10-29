import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './blog_reducer'
import userReducer from './userReducer'

export const store = configureStore({
    reducer:{
        blogs:blogReducer,
        user:userReducer
    }
})