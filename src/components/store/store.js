import { configureStore } from '@reduxjs/toolkit';
import sortingReducer from './slices/sortingSlice';
import filterReducer from './slices/filterSlice';
import ticketsReducer from './slices/ticketsSlice';

export const store = configureStore({
    reducer: {
        tickets: ticketsReducer,
        sorting: sortingReducer,
        filter: filterReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;