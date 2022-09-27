import { configureStore } from '@reduxjs/toolkit'
// import dataAPI from './dataAPI'
// import itinerarysSlice from './itineraiesSlice'
// import usersSlice from './usersSlice'
// import commentsSlice from './commentsSlice'
import citiesSlice from './citiesSlice'


export const store = configureStore({
    reducer: {
        [citiesSlice.reducerPath]: citiesSlice.reducer,
        // [dataAPI.reducerPath]: dataAPI.reducer,
        // [usersSlice.reducerPath]: usersSlice.reducer,
        // [itinerarysSlice.reducerPath]: itinerarysSlice.reducer,
        // [commentsSlice.reducerPath]: commentsSlice.reducer,
    }
})