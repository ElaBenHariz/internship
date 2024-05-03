import axios from "axios";
import { getToken } from "../../../getToken";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState={
    Lists:[],
    loading:false,
    success:false,
    error:null,
    message:""
}


export const getLists=createAsyncThunk("proj/getLists",async (proj,ThunkAPI)=>{

  try {
    const response=await axios.get("http://localhost:8000/lists/get/"+proj,{
        headers: {"Authorization" : `Bearer ${getToken()}`} }
    )
    return response.data
  } catch (error) {
    
    return ThunkAPI.rejectWithValue(error.response.data)
 
}
})





export const addList=createAsyncThunk("proj/addList",async (data,ThunkAPI)=>{

    try {
        
      const response=await axios.post("http://localhost:8000/Lists/add/"+data.projectId,data.name,{
          headers: {"Authorization" : `Bearer ${getToken()}`} }
      )
      return response.data
    } catch (error) {
      
      return ThunkAPI.rejectWithValue(error.response.data)
   
  }
  })


  export const deleteList=createAsyncThunk("proj/deleteList",async (data,ThunkAPI)=>{

    try {
        
      const response=await axios.delete("http://localhost:8000/Lists/delete/"+data,{
          headers: {"Authorization" : `Bearer ${getToken()}`} }
      )
      return response.data
    } catch (error) {
      
      return ThunkAPI.rejectWithValue(error.response.data)
   
  }
  })

  export const EditList=createAsyncThunk("proj/EditList",async (data,ThunkAPI)=>{

    try {
        
      const response=await axios.put("http://localhost:8000/Lists/updateName/"+data.ListId,{name:data.name},{
          headers: {"Authorization" : `Bearer ${getToken()}`} }
      )
      return response.data
    } catch (error) {
      
      return ThunkAPI.rejectWithValue(error.response.data)
   
  }
  })

  export const moveCard=createAsyncThunk("Lists/moveCard",async (card,ThunkAPI)=>{

    try {
        
      const response=await axios.post("http://localhost:8000/lists/moveCardToList",card,{
          headers: {"Authorization" : `Bearer ${getToken()}`} }
      )
      return response.data
    } catch (error) {
      
      return ThunkAPI.rejectWithValue(error.response.data)
   
  }
  })
  export const deleteCardFromList =createAsyncThunk("Lists/deleteCardFromList",async (card,ThunkAPI)=>{

    try {
        
      const response=await axios.post("http://localhost:8000/lists/deleteCardFromList",card,{
          headers: {"Authorization" : `Bearer ${getToken()}`} }
      )
      return response.data
    } catch (error) {
      
      return ThunkAPI.rejectWithValue(error.response.data)
   
  }
  })
  export const addCardToList =createAsyncThunk("Lists/addCardToList",async (data,ThunkAPI)=>{

    try {
        // you cant pass many argumens in the slice 
        console.log(data)
      const response=await axios.post("http://localhost:8000/lists/addCardToList/"+data.list_id,data.card,{
          headers: {"Authorization" : `Bearer ${getToken()}`} }
      )
      return response.data
    } catch (error) {
      
      return ThunkAPI.rejectWithValue(error.response.data)
   
  }
  })
  


export const ListSlice=createSlice(
    {
        name:"Lists",
        initialState,
        reducers:{
            reset:(state)=>{
                state.loading=false;
                state.success=false;
                state.error=null;
                state.message="";
                state.Lists=[];

            }
        },
        extraReducers:(builder)=>{
        builder.addCase(getLists.fulfilled,(state,action)=>{
                console.log(action.payload)
                state.Lists=action.payload
                }).addCase(moveCard.fulfilled,(state,action)=>{
                  state.Lists=action.payload

                }).addCase(deleteCardFromList.fulfilled,(state,action)=>{
                  state.Lists=action.payload
                }).addCase(addCardToList.fulfilled,(state,action)=>{
                  state.Lists=action.payload
                }).addCase(addList.fulfilled,(state,action)=>{
                  state.Lists.push(action.payload)
                }).addCase(deleteList.fulfilled,(state,action)=>{
                  state.Lists=action.payload
                }).addCase(EditList.fulfilled,(state,action)=>{
                  state.Lists=action.payload
                })
        }})

        export const {reset}=ListSlice.actions;
export default ListSlice.reducer;