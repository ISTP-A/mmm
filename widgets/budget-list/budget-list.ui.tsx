"use client"

import { budgetsQueryOptions } from "@/entities/budgets/budgets.api"
import { getBudgetScheduleLabel } from "@/entities/budgets/budgets.lib"
import { Budget } from "@/entities/budgets/budgets.types"
import { getPaymentCurrency, getPaymentTypeLabel } from "@/entities/payment/payment.lib"
import { UniqueId } from "@/global"
import { cn } from "@/shared/lib/utils"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { ReactNode, Suspense } from "react"
import { BudgetListSkeleton } from "./budget-list.skeleton"

export function BudgetList() {
    return (
        <Suspense fallback={<BudgetListSkeleton />}>
            <BaseBudgetList />
        </Suspense>
    )
}

export function BaseBudgetList() {
    const navigate = useRouter()
    const { data: budgets } = useSuspenseQuery(budgetsQueryOptions())
    const onClick = (id: UniqueId) => () => navigate.push(`/budgets/${id}`)
    return (
        <div className="px-4">
            {budgets.count === 0 && <div>no list</div>}

            {budgets.budgets.map((budget) => {
                return (
                    <div key={budget.id} onClick={onClick(budget.id)}>
                        <BudgetMeta budget={budget} />
                    </div>
                )
            })}
        </div>
    )
}

type BudgetMetaProps = { budget: Budget, action?: ReactNode }
function BudgetMeta(props: BudgetMetaProps) {
    const { budget, action } = props

    return (
        <div className="w-full py-6">
            {action}
            <div
                className={
                    cn(
                        "flex items-center justify-between",
                        "font-semibold"
                    )
                }
            >
                <div>{budget.title}</div>
                <div>{budget.totalValue.toLocaleString()} {getPaymentCurrency(budget.currency)}</div>
            </div>
            <div
                className={cn(
                    "flex items-center justify-between gap-2",
                    "text-sm text-muted-foreground",
                )}
            >
                <p>{getPaymentTypeLabel(budget.paymentType)}</p>
                {budget.schedules.map((schedule, idx) => {
                    return (
                        <span key={`schedule` + budget.id + idx} >
                            {getBudgetScheduleLabel(schedule)} · {budget.value.toLocaleString()}원
                        </span>
                    )
                })}
            </div>
        </div>
    )
}

function MoreAction(props: { budget: Budget }) {
    const { budget } = props
    return <></>
}