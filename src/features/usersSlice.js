import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import api from '../api'

const usersSlice = createApi({
    reducerPath: "usersSlice",

    baseQuery: fetchBaseQuery({
        baseUrl: api
    }),

    endpoints: (builder) => ({
        // signUp: builder.mutation({ query: user => ({ url: "/auth/signup", method: "POST", body: user }) }),

        signIn: builder.mutation({ query: user => ({ url: "/auth/signin", method: "POST", body: user }) }),

        // signOut: builder.mutation({ query: user => ({ url: "/auth/signout", method: "POST", body: user }) })

    })
})

export default usersSlice

export const { useSignInMutation} = usersSlice

// export const {useSignUpMutation, useSignInMutation, useSignOutMutation} = usersSlice