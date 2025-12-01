import { UniqueId } from "@/global"
import { api } from "./api.instance"
import { responseContract } from "./api.lib"
import { BudgetDtoSchema, BudgetsDtoSchema, BudgetStatisticsDtoSchema, CreateBudgetDtoSchema, UpdateBudgetDtoSchema } from "./api.contracts"
import { CreateBudgetDto, UpdateBudgetDto } from "./api.types"
import { AxiosRequestConfig } from "axios"


// Budgets
export function getBudgets() {
    return api.get('/budgets').then(responseContract(BudgetsDtoSchema))
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