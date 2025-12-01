import { transformBudgetDtoToBudget } from "@/entities/budgets/budgets.lib";
import { Budget } from "@/entities/budgets/budgets.types";
import { createBudget } from "@/shared/api/api.service";
import { CreateBudgetDto } from "@/shared/api/api.types";
import { DefaultError, mutationOptions, useMutation, UseMutationOptions } from "@tanstack/react-query";

export function useCreateBudgetMutation(
    options: Pick<
        UseMutationOptions<Budget, DefaultError, CreateBudgetDto, unknown>,
        'mutationKey' | 'onMutate' | 'onSuccess' | 'onError' | 'onSettled'
    >
) {
    const { mutationKey = [], onMutate, onSuccess, onError, onSettled } = options

    return useMutation({
        mutationKey: ['budget', 'create', ...mutationKey],
        mutationFn: async (payload: CreateBudgetDto) => {
            const { data } = await createBudget(payload)
            const budget = transformBudgetDtoToBudget(data)
            return budget
        },

        onMutate,
        onSuccess,
        onError,
        onSettled,
    })
}