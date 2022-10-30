import { configureStore } from '@reduxjs/toolkit';
import itineraryReducer from './itinerarySlice.js'
import anotherReducer from './anotherSlice.js'

export const store = configureStore({
    reducer: {
        itinerary: itineraryReducer,
        another: anotherReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})
