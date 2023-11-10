import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { contact } from "../models/contact.model";


export const Api = createApi({
 reducerPath : "api",
baseQuery : fetchBaseQuery({ baseUrl : "https://654e6dabcbc325355742ddb8.mockapi.io/"}),

tagTypes: ["contact"],
endpoints : (builder) =>({
    contacts : builder.query <contact[],void>({
         // for (void) we are not passing any argument in query, so that it is return void type
        query : ()=>"/rtkcrud",
        providesTags : ["contact"]
    }),
    
    addContact : builder.mutation<void, contact>({
       query : (body)=>({
        url : "/rtkcrud",
        method : "POST",
        body: body
       }),
       invalidatesTags : ["contact"]
    }),

    updateContact : builder.mutation<void, contact>({
        query : ({id,...rest})=>({
            url : `/rtkcrud/${id}`,
            method : "PUT",
            body : rest
        }),
        invalidatesTags : ["contact"]
    }),
    
    deleteContact : builder.mutation<void, contact>({
        query : (id) =>({
            url : `/rtkcrud/${id}`,
            method : 'DELETE',
        }),
        invalidatesTags : ["contact"]
    })



})




})

export const {useContactsQuery, useAddContactMutation, useUpdateContactMutation, useDeleteContactMutation} = Api;