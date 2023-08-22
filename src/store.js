import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice';
import data from './store/dataSlice';

export let { changeName, changeAge } = user.actions
export let { changePlusCnt, changeMinusCnt } = data.actions

let stock = createSlice({
    name: 'stock',
    initialState: [10, 11, 12]
})

export default configureStore({
    reducer: { 
        user : user.reducer,
        stock : stock.reducer,
        data : data.reducer
    }
}) 