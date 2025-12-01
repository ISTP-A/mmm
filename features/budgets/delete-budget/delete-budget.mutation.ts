import { UniqueId } from "@/global";
import { deleteBudget } from "@/shared/api/api.service";
import { DefaultError, useMutation, UseMutationOptions } from "@tanstack/react-query";

export const useDeleteBudgetMutation = (
    options: Pick<
        UseMutationOptions<void, DefaultError, number, unknown>,
        'mutationKey' | 'onMutate' | 'onSuccess' | 'onError' | 'onSettled'
    >
) =>
    useMutation({
        mutationFn: async (id: UniqueId) => {
            await deleteBudget(id)
        },
        ...options,
    })