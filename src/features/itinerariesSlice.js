import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import api from '../api'

const itinerarysSlice = createApi({
    reducerPath: "itinerarySlice",

    baseQuery: fetchBaseQuery({
        baseUrl: api
    }),

    endpoints: (builder) => ({
        getItineraryCity: builder.query({ query: id => `/itineraries?city=${id}` }),

        // addItinerary: builder.mutation({ query: itinerary => ({ url: "/itineraries", method: "POST", body: itinerary }) }),

        // editItinerary: builder.mutation({ query: ({id, ...itineraryBody}) => ({ url: `/itineraries/${id}`, method: "PATCH", body: itineraryBody }) }),

        // deleteItinerary: builder.mutation({ query: itineraryid => ({ url: `/itineraries/${itineraryid}`, method: "DELETE", body: itineraryid }) }),

        // like: builder.mutation({ query: (id) => ({ url: `/itineraries/likes/${id}`, method: 'PATCH', headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`} })})

    })
})

export default itinerarysSlice

export const { useGetItineraryCityQuery } = itinerarysSlice

// useAddItineraryMutation, useEditItineraryMutation , useDeleteItineraryMutation, useLikeMutation