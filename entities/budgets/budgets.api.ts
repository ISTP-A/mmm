"use client"

import { BudgetFilters, getBudgetById, getBudgets, getBudgetStatistics } from "@/shared/api/api.service";
import { queryClient } from "@/shared/queryClient";
import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { transformBudgetDtoToBudget, transformBudgetsDtoToBudget, transformBudgetStatisticsDtoToBudget } from "./budgets.lib";
import { Budgets, BudgetStatistics } from "./budgets.types";
import { UniqueId } from "@/global";

export const BUDGETS_ROOT_QUERY_KEY = ["budgets"] as const

export const budgetsQueryOptions = (filters: BudgetFilters = {}) =>
    queryOptions({
        queryKey: [...BUDGETS_ROOT_QUERY_KEY, 'list', filters],
        queryFn: async () => {
            console.log(filters)
            const { data } = await getBudgets(filters)
            const budgets = transformBudgetsDtoToBudget(data)
            return budgets
        },
        placeholderData: keepPreviousData,
        initialData: () => queryClient.getQueryData<Budgets>([...BUDGETS_ROOT_QUERY_KEY, 'list', filters]),
        initialDataUpdatedAt: () => queryClient.getQueryState([...BUDGETS_ROOT_QUERY_KEY, 'list', filters])?.dataUpdatedAt,
        staleTime: 0,
        gcTime: 0,
    })
export const budgetQueryOptions = (id: UniqueId) =>
    queryOptions({
        queryKey: [...BUDGETS_ROOT_QUERY_KEY, id],
        queryFn: async () => {
            const { data } = await getBudgetById(id)
            const budget = transformBudgetDtoToBudget(data)
            return budget
        },
        enabled: !!id,
    })


export const budgetStatisticsQueryOptions = () =>
    queryOptions({
        queryKey: [...BUDGETS_ROOT_QUERY_KEY, 'statistics'],
        queryFn: async () => {
            const { data } = await getBudgetStatistics()
            const statistics = transformBudgetStatisticsDtoToBudget(data)
            return statistics
        },
        placeholderData: keepPreviousData,
        initialData: () => queryClient.getQueryData<BudgetStatistics>([...BUDGETS_ROOT_QUERY_KEY, 'statistics']),
        initialDataUpdatedAt: () => queryClient.getQueryState([...BUDGETS_ROOT_QUERY_KEY, 'statistics'])?.dataUpdatedAt,
    })