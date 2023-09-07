import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IEmployee } from "../../models/employee.model";

export const  employeesApi = createApi({
    reducerPath:'employeesApi',
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:8000"}),
    tagTypes:['Employee'],
    endpoints:(builder) => ({
        getEmployees:builder.query<IEmployee[],void>({
            query:()=>"/employees",
            providesTags:['Employee']
        }),
        getEmployee:builder.query<IEmployee,number>({
            query:(id)=>`/employees/${id}`,
            providesTags:['Employee']
        }),
        addEmployee: builder.mutation<void, IEmployee>({
            query:employee => ({
                url:"/employees",
                method:'POST',
                body:employee
            }),
            invalidatesTags:['Employee']
        }),
        updateEmployee: builder.mutation<void, IEmployee>({
            query:({id, ...rest}) => ({
                url:`/employees/${id}`,
                method:'PUT',
                body:rest
            }),
            invalidatesTags:['Employee']
        }),
        deleteEmployee: builder.mutation<void, IEmployee>({
            query:({id, ...rest}) => ({
                url:`/employees/${id}`,
                method:'DELETE',
                body:rest
            }),
            invalidatesTags:['Employee']
        })
    })
})

export const {useGetEmployeesQuery,useGetEmployeeQuery, useAddEmployeeMutation,useUpdateEmployeeMutation, useDeleteEmployeeMutation} = employeesApi