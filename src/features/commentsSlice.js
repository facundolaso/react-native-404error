import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import api from '../api'
import AsyncStorage from '@react-native-async-storage/async-storage'

const commentsSlice = createApi({
    reducerPath: "commentsSlice",

    baseQuery: fetchBaseQuery({
        baseUrl: api
    }),

    endpoints: (builder) => ({

        newComment: builder.mutation({ query: (id, comment, token) => ({ url: `/comments?id=${id}`, method: 'POST', headers: { Authorization: `Bearer ${JSON.parse(token)}`}, body: comment })}),

        getCommentsItinerary: builder.query({ query: id => `/comments?itinerary=${id}` }),
        
        editComment: builder.mutation({ query: ({id, ...comment}) => ({ url: `/comments?id=${id}`, method: 'PATCH', headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`}, body: comment })}),
        
        deleteComment: builder.mutation({ query: commentId => ({ url: `/comments/${commentId}`, method: "DELETE", headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`}, body: commentId }) }),

    })
})

export default commentsSlice

export const { useNewCommentMutation, useGetCommentsItineraryQuery , useDeleteCommentMutation,  useEditCommentMutation} = commentsSlice
