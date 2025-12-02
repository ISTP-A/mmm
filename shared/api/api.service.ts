import { UniqueId } from "@/global"
import { api } from "./api.instance"
import { responseContract } from "./api.lib"
import { BudgetDtoSchema, BudgetsDtoSchema, BudgetStatisticsDtoSchema, CreateBudgetDtoSchema, UpdateBudgetDtoSchema } from "./api.contracts"
import { CreateBudgetDto, PaymentTypeDto, SpendTypeDto, UpdateBudgetDto } from "./api.types"
import { AxiosRequestConfig } from "axios"


// Budgets


export interface BudgetFilters {
    spendType?: SpendTypeDto[]
    paymentType?: PaymentTypeDto[]
    sort?: string
}


export function getBudgets(filters: BudgetFilters = {}) {
    const params = new URLSearchParams()

    filters.spendType?.forEach(v => params.append("spendType", v))
    filters.paymentType?.forEach(v => params.append("paymentType", v))
    if (filters.sort) params.set('sort', filters.sort)

    const query = params.toString()
    const url = query ? `/budgets?${query}` : "/budgets"
    return api.get(url).then(responseContract(BudgetsDtoSchema))
}

export function getBudgetById(id: UniqueId) {
    return api.get(`/budgets/${id}`).then(responseContract(BudgetDtoSchema))
}

export function createBudget(createBudgetDto: CreateBudgetDto, config?: AxiosRequestConfig<CreateBudgetDto>) {
    const data = CreateBudgetDtoSchema.parse(createBudgetDto)
    return api.post('/budgets', data, config).then(responseContract(BudgetDtoSchema))
}

export async function updateBudget(id: UniqueId, updateBudgetDto: UpdateBudgetDto) {
    const data = UpdateBudgetDtoSchema.parse(updateBudgetDto)
    return api.patch(`/budgets/${id}`, data).then(responseContract(BudgetDtoSchema))
}

export function deleteBudget(id: UniqueId, config?: AxiosRequestConfig) {
    return api.delete(`/budgets/${id}`, config)
}

export function getBudgetStatistics() {
    return api.get('/budgets/statistics').then(responseContract(BudgetStatisticsDtoSchema))

}