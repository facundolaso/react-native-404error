import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import api from '../api'

const citiesSlice = createApi({
    reducerPath: "dataAPI",

    baseQuery: fetchBaseQuery({
        baseUrl: api
    }),

    endpoints: (builder) => ({
        // addCity: builder.mutation({ query: city => ({ url: "/cities", method: "POST", body: city }) }),

        getAllCities: builder.query({ query: () => "/cities" }),

        // getCityName: builder.query({ query: name => `/cities?city=${name}` }),

        // updateCity: builder.mutation({ query: ({ id, ...patch }) => ({ url: `/cities/${id}`, method: "PATCH", body: patch }) }),

        getDetailCity: builder.query({query: (city) => `/cities/${city}`}),

    })
})

export default citiesSlice

export const {useGetAllCitiesQuery, useGetDetailCityQuery} = citiesSlice

// ,useAddCityMutation, useGetCityNameQuery, useUpdateCityMutation, useGetAllItinerariesQuery , useGetItineraryCityQuery, useGetActivitieItineraryQuery, useGetCommentsItineraryQuery, useGetItineraryUserQuery, useGetDetailCityQuery
