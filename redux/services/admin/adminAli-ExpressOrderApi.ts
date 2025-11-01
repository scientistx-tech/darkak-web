import { Product, UpdateProduct } from "@/types/apiTypes";
import baseApi from "../../baseApi";

interface UpdateProductPayload {
    id: string;
    data: UpdateProduct;
}

export const adminAliExpressOrderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // orders

        getAliExpressOrders: builder.query({
            query: (params?: Record<string, string>) => {
                const queryString = params
                    ? `?${new URLSearchParams(params).toString()}`
                    : "";
                return {
                    url: `/aliexpress/orders${queryString}`,
                    method: "GET",
                };
            },
        }),

        getAliExpressOrderDetails: builder.query({
            query: (id: string) => ({
                url: `/admin/order/details/${id}`,
                method: "GET",
            }),
        }),

        // change product status

        updateAliExpressPaymentStatus: builder.mutation<any, any>({
            query: (id) => ({
                url: `/admin/order/payment/${id}`,
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }),
        }),

        updateAliExpressOrderStatus: builder.mutation<
            any,
            {
                id: string;
                data: { status: string; message?: string };
            }
        >({
            query: ({
                id,
                data,
            }: {
                id: string;
                data: { status: string; message?: string };
            }) => ({
                url: `/admin/order/status/${id}`,
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: data,
            }),
        }),
    }),
});

export const {
    useGetAliExpressOrdersQuery, useGetAliExpressOrderDetailsQuery, useUpdateAliExpressOrderStatusMutation,useUpdateAliExpressPaymentStatusMutation
} = adminAliExpressOrderApi;
