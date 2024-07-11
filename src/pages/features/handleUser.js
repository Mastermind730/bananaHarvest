import { createSlice } from "@reduxjs/toolkit";

export const HandleUser = createSlice({
    name: "handleUser",
    initialState:{
        value:{
            selectedTab: null
        }
    },
    reducers: {
        setSelectedTab: (state, action) => {
            console.log(action.payload)
            state.value.selectedTab = action.payload;
        }
    }
});

export const { setSelectedTab} = HandleUser.actions;
export default HandleUser.reducer