import { configureStore} from '@reduxjs/toolkit'
import authReducer from './redux/slices/authSlice';
import projReducer from './redux/slices/projectSlice';
import teamReducer from './redux/slices/TeamSlice';
import usersReducer from './redux/slices/usersSlice'
import listsReducer from './redux/slices/Tasks/ListSlice';
import devToolsEnhancer from 'remote-redux-devtools';
export const Store=configureStore({
    reducer:{
        auth: authReducer,
        proj:projReducer,
        team:teamReducer,
        userrs:usersReducer,
        Lists: listsReducer,


    }
    
}, devToolsEnhancer()

)