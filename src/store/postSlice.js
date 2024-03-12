import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    postData: null
}

const postSlice = createSlice(
    {
        name: 'post',
        initialState,
        reducers: {
            addpost : (state , action)=>{
                state.postData = action.payload
            },
        }
    }
)

export const{addpost , removepost} = postSlice.actions
export default postSlice.reducer