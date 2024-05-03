import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios'
import { getToken } from '../../getToken';


const initialState={
    users:[],
    specificUsers:[],
    loading:false,
    success:false,
    error:null,
    message:""

}
    

export const getUsers=createAsyncThunk('userrs/getUsers',

async(users,ThunkAPI)=>{


  try {
    const response=  await axios.get('http://localhost:8000/users/get',{
        headers: {"Authorization" : `Bearer ${getToken()}`} })

    if(response.data){
        console.log(response.data)
    return response.data}
  } catch (error) {

    return ThunkAPI.rejectWithValue(error.response.data)
    
  }

})
export const getSpecificUsers=createAsyncThunk('userrs/geSpecifictUsers',

async(data,ThunkAPI)=>{


  try {
    const response=  await axios.post('http://localhost:8000/users/getSpesific',data)

    if(response.data){
        console.log(response.data)
    return response.data}
  } catch (error) {

    return ThunkAPI.rejectWithValue(error.response.data)
    
  }
})


export const usersSlice=createSlice({

    name:'userrs',
    initialState,
    reducers:{
        reset:(state)=>{
            state.loading=false;
            state.success=false;
            state.error=null;
            state.message="";
        }

    },
    extraReducers:(builder)=>{

        builder.addCase(getUsers.pending,(state)=>{

            state.loading=true;

        }).addCase(getUsers.fulfilled,(state,action)=>{
            state.loading=false;
            state.success=true;
            state.users=action.payload;
            state.message="Getting users fulfilled"

        }
        ).addCase(getUsers.rejected,(state,action)=>{

            state.error=action.payload;
            state.loading=false;
            state.success=false;
            state.message="Getting users failed"
        }).addCase(getSpecificUsers.fulfilled,(state,action)=>{
            state.loading=false;
            state.success=true;
            state.users=action.payload;
            state.message="Getting users fulfilled"

        }
        ).addCase(getSpecificUsers.rejected,(state,action)=>{

            state.error=action.payload;
            state.loading=false;
            state.success=false;
            state.message="Getting users failed"
        })

    }


})
export const {reset}=usersSlice.actions;
export default usersSlice.reducer;