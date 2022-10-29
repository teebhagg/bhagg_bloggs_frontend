import { createSlice } from "@reduxjs/toolkit";

export const blogSlice = createSlice({
    name:'blogs',
    initialState:{
        blogPosts: null
    },
    reducers:{
        getBlogs:(state, action)=>{
            state.blogPosts = action.payload;
        },
        addBlog:(state, action)=>{
            state.blogPosts.push(action.payload);
        }
    }
})

export const { getBlogs, addBlog } = blogSlice.actions;

export default blogSlice.reducer