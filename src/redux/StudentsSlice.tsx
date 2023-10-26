import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"



export const StudentsApi = createApi({
 reducerPath : "StudentsApi",
baseQuery : fetchBaseQuery({ baseUrl : "https://653a02d0e3b530c8d9e8f59c.mockapi.io"}),

endpoints : (builder) =>({
    getData : builder.query ({
        query : ()=>"/rtkCrud"
    }),
    
    PostData : builder.mutation({
       query : (body)=>({
        url : "/rtkCrud",
        method : "POST",
        body: body
       })
    }),

    deleteData : builder.mutation({
        query : (id) =>({
            url : `/rtkCrud/${id}`,
            method : 'DELETE',
        })
    }),

    updateData : builder.mutation({
        query : ({_id,updateCardData})=>({
            url : `/rtkCrud/${_id}`,
            method : "PATCH",
            body : updateCardData
        })
    })


})




})

export const {useGetDataQuery, usePostDataMutation, useDeleteDataMutation, useUpdateDataMutation} = StudentsApi;