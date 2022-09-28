import { configureStore } from '@reduxjs/toolkit'
// import dataAPI from './dataAPI'

import usersSlice from './usersSlice'

import itinerarysSlice from './itinerariesSlice'

// import commentsSlice from './commentsSlice'
import citiesSlice from './citiesSlice'


export const store = configureStore({
    reducer: {
        [citiesSlice.reducerPath]: citiesSlice.reducer,
        [usersSlice.reducerPath]: usersSlice.reducer,
        // [dataAPI.reducerPath]: dataAPI.reducer,
        [itinerarysSlice.reducerPath]: itinerarysSlice.reducer,

        // [commentsSlice.reducerPath]: commentsSlice.reducer,
    }
})