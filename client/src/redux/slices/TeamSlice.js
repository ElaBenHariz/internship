import axios from "axios";
import { getToken } from "../../getToken";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState={
    teams:[],
    loading:false,
    success:false,
    error:null,
    message:""
}




export const getTeams=createAsyncThunk("team/getTeams",async (team,ThunkAPI)=>{

    try {
      const response=await axios.get("http://localhost:8000/teams/getTeam",{
          headers: {"Authorization" : `Bearer ${getToken()}`} }
      )
      return response.data
    } catch (error) {
      
      return ThunkAPI.rejectWithValue(error.response.data)
   
  }
  })

  export const addTeam=createAsyncThunk("team/addTeam",async (team,ThunkAPI)=>{

    try {
      const response=await axios.post("http://localhost:8000/teams/addTeam",team,{
          headers: {"Authorization" : `Bearer ${getToken()}`} }
      )
      return response.data
    } catch (error) {
      
      return ThunkAPI.rejectWithValue(error.response.data)
   
  }
  })



export const TeamSlice=createSlice(
    {
        name:"team",
        initialState,
        reducers:{
            reset:(state)=>{
                state.loading=false;
                state.success=false;
                state.error=null;
                state.message="";
              
                state.teams=[]

            }
        },
        extraReducers:(builder)=>{
         builder.addCase(getTeams.fulfilled,(state,action)=>{
            state.teams=action.payload
            state.loading=false;
            state.success=true;
            state.error=null;
            state.message="getting teams fullfilled";
         }).addCase(addTeam.fulfilled,(state,action)=>{
            state.teams.push(action.payload);
            state.loading=false;
            state.success=true;
            state.error=null;
            state.message="adding a team fullfilled";
         })
    
        }
    }
)

export const {reset}=TeamSlice.actions;
export default TeamSlice.reducer;