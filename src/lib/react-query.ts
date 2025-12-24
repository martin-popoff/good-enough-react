/* eslint-disable @typescript-eslint/no-explicit-any */
import { type UseQueryOptions, type UseMutationOptions, type DefaultOptions } from "@tanstack/react-query";

import type { AxiosError } from "axios";

const queryConfig = {
    queries: {
        // throwOnError: true,
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 1000 * 60,
    },
} satisfies DefaultOptions;

type ApiFnReturnType<FnType extends (...args: any) => Promise<any>> = Awaited<ReturnType<FnType>>;

type QueryConfig<
    QueryFnType extends (...args: any) => any,
    TError = AxiosError<ApiFnReturnType<QueryFnType>>,
    TData = ApiFnReturnType<QueryFnType>,
> = Omit<UseQueryOptions<ApiFnReturnType<QueryFnType>, TError, TData>, "queryKey" | "queryFn">;

type MutationConfig<
    MutationFnType extends (...args: any) => any,
    TError = AxiosError<ApiFnReturnType<MutationFnType>>,
> = UseMutationOptions<ApiFnReturnType<MutationFnType>, TError, Parameters<MutationFnType>[0]>;

export type { QueryConfig, MutationConfig };
export { queryConfig };
