import { budgetStatisticsQueryOptions } from "@/entities/budgets/budgets.api"
import { getPaymentCurrency } from "@/entities/payment/payment.lib"
import { useSuspenseQuery } from "@tanstack/react-query"
import { Suspense } from "react"
import { BudgetStatisticsSkeleton } from "./budget-stat.skeleton"
import { formatSimpleDate } from "@/shared/lib/date"

export function BudgetStat() {
    return (
        <Suspense fallback={<BudgetStatisticsSkeleton />}>
            <BaseBudgetStatistics />
        </Suspense>
    )
}

export function BaseBudgetStatistics() {
    const { data: stat } = useSuspenseQuery(budgetStatisticsQueryOptions())

    return (
        <div className="px-4 py-10 border-b flex flex-col items-center justify-center">
            <p className="text-muted-foreground">이달의 총 예산</p>
            <strong className="text-2xl">{stat.totalBudget.toLocaleString()} {getPaymentCurrency('KRW')}</strong>
            <p className="text-sm text-muted-foreground flex items-center gap-1 pt-2">
                <span>산정기간: </span>
                <span>{formatSimpleDate(stat.period.first)}</span>
                <span>~</span>
                <span>{formatSimpleDate(stat.period.last)}</span>
            </p>
        </div>
    )
}