import { createSlice } from '@reduxjs/toolkit'

let data = createSlice({
    name: 'data',
    initialState:
    [
        // {id : 1, name : 'Chocolate Cake', count : 2},
        // {id : 2, name : 'Basic Scone', count : 1}
    ],
    reducers : {
        changePlusCnt(state, action) {
            let idNum = state.findIndex((a)=>{ return a.id === action.payload })
            state[idNum].count++;
        },
        addToCart(state, action) {
            state.push(action.payload);
        },
        removeToCart(state, action) {
            state.pop(action.payload);
        },
        changeMinusCnt(state, action) {
            let idNum = state.findIndex((a)=>{ return a.id === action.payload })
            state[idNum].count--;
        }
    }
})


export let { changePlusCnt, changeMinusCnt, addToCart, removeToCart } = data.actions;

export default data;
