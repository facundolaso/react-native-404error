import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import api from '../api'

const activitiesSlice = createApi({
    reducerPath: "activitiesSlice",

    baseQuery: fetchBaseQuery({
        baseUrl: api
    }),

    endpoints: (builder) => ({
        
        getActivitieItinerary: builder.query({ query: id => `/activities?itinerary=${id}` }),

    })
})

export default activitiesSlice

export const {useGetActivitieItineraryQuery} = activitiesSlice
