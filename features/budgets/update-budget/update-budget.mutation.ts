import { transformBudgetDtoToBudget } from "@/entities/budgets/budgets.lib"
import { Budget } from "@/entities/budgets/budgets.types"
import { UniqueId } from "@/global"
import { updateBudget } from "@/shared/api/api.service"
import { UpdateBudgetDto } from "@/shared/api/api.types"
import { DefaultError, useMutation, UseMutationOptions } from "@tanstack/react-query"

export function useUpdateBudgetMutation(
    options: Pick<
        UseMutationOptions<Budget, DefaultError, { id: UniqueId, payload: UpdateBudgetDto }, unknown>,
        'mutationKey' | 'onMutate' | 'onSuccess' | 'onError' | 'onSettled'
    >
) {
    const { mutationKey = [], onMutate, onSuccess, onError, onSettled } = options

    return useMutation({
        mutationKey: ['budget', 'create', ...mutationKey],
        mutationFn: async ({ id, payload }: { id: UniqueId, payload: UpdateBudgetDto }) => {
            const { data } = await updateBudget(id, payload)
            const budget = transformBudgetDtoToBudget(data)
            return budget
        },

        onMutate,
        onSuccess,
        onError,
        onSettled,
    })
}