import { createSlice } from "@reduxjs/toolkit";

let storedTodos = JSON.parse(localStorage.getItem('todos'));

const todoSlice = createSlice({
    name: 'todo',
    initialState: storedTodos || [],
    reducers: {
        add(state, action) {
            localStorage.setItem('todos', JSON.stringify([...state, action.payload]));
            state.push(action.payload);
        },
        update(state, action) {
            let newTodos = [...state];
            newTodos[action.payload.index] = action.payload.updatedTodo;
            localStorage.setItem('todos', JSON.stringify([...newTodos]));
            return newTodos;
        },
        remove(state, action) {
            let newTodos = state.filter((todo) => todo.id !== action.payload);
            localStorage.setItem('todos', JSON.stringify(newTodos));
            return newTodos
        }
    }
});

export const { add, update, remove } = todoSlice.actions;
export default todoSlice.reducer;