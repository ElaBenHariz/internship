import axios from "axios";
import { getToken } from "../../getToken";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState={
    projects:[],
    teamProjects:[],
    personalProjects:[],
    loading:false,
    success:false,
    error:null,
    message:""
}

    


export const getPersoProjects=createAsyncThunk("proj/getPersoProjects",async (proj,ThunkAPI)=>{

  try {
    const response=await axios.get("http://localhost:8000/projects/getPersProj",{
        headers: {"Authorization" : `Bearer ${getToken()}`} }
    )
    return response.data
  } catch (error) {
    
    return ThunkAPI.rejectWithValue(error.response.data)
 
}
})


export const getTeamProjects=createAsyncThunk("proj/getTeamProjects",async (proj,ThunkAPI)=>{

    try {
      const response=await axios.get("http://localhost:8000/projects/getTeamProject",{
          headers: {"Authorization" : `Bearer ${getToken()}`} }
      )
      return response.data
    } catch (error) {
      
      return ThunkAPI.rejectWithValue(error.response.data)
   
  }
  })
export const getAllProjects=createAsyncThunk("proj/getAllProjects", async (data,ThunkAPI)=>{

    try{
      const response= await axios.get("http://localhost:8000/projects/get",
      {headers:{"Authorization": `Bearer ${getToken()}`}})
      return response.data
    }
    catch(error){
        return ThunkAPI.rejectWithValue(error.response.data)
    }
})


export const addProject=createAsyncThunk("proj/addProject",async (proj,ThunkAPI)=>{

    try {
        
      const response=await axios.post("http://localhost:8000/projects/add",proj,{
          headers: {"Authorization" : `Bearer ${getToken()}`} }
      )
      return response.data
    } catch (error) {
      
      return ThunkAPI.rejectWithValue(error.response.data)
   
  }
  })

  export const deleteProject=createAsyncThunk("proj/deleteProject",async (projId,ThunkAPI)=>{

    try {
        
      const response=await axios.delete("http://localhost:8000/projects/delete/"+projId,{
          headers: {"Authorization" : `Bearer ${getToken()}`} }
      )
      return response.data
    } catch (error) {
      
      return ThunkAPI.rejectWithValue(error.response.data)
   
  }
  })


export const projectSlice=createSlice(
    {
        name:"proj",
        initialState,
        reducers:{
            reset:(state)=>{
                state.loading=false;
                state.success=false;
                state.error=null;
                state.message="";
                state.projects=[];
                state.personalProjects=[];
                state.teamProjects=[]

            }
        },
        extraReducers:(builder)=>{
        builder.addCase(getPersoProjects.fulfilled,(state,action)=>{
                console.log(action.payload)
                state.personalProjects=action.payload
                }).addCase(getAllProjects.fulfilled,(state,action)=>{
                console.log(action.payload)
                state.projects=action.payload
                state.error=false
                state.success=true
                state.loading=false
                state.message="get all projects fulfilled"
               }) .addCase(getAllProjects.pending,(state)=>{
                state.loading=true;
    
            }).addCase(getAllProjects.rejected,(state,action)=>{
                state.error=action.payload;
                state.loading=false;
                state.success=false;
                state.message="getting all projects failed"
            }).addCase(getTeamProjects.fulfilled,(state,action)=>{
                state.teamProjects=action.payload;
                state.message="getting team project fullfilled"
                state.success=true
                state.loading=false
                state.error=false
            }).addCase(addProject.fulfilled,(state,action)=>{
                if(!action.payload.isTeamProject)
                state.personalProjects.push(action.payload);
            else state.teamProjects.push(action.payload);

                state.message="getting team project fullfilled"
                state.success=true
                state.loading=false
                state.error=false}).addCase(deleteProject.fulfilled,(state,action)=>{
                    state.personalProjects = state.personalProjects.filter(project => project._id !== action.payload)
                })
                }
           
    
        })

export const {reset}=projectSlice.actions;
export default projectSlice.reducer;