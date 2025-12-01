"use client"

import { budgetQueryOptions } from "@/entities/budgets/budgets.api"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"
import { Suspense } from "react"
import { BudgetDetailSkeleton } from "./budget-detail.skeleton"
import { getBudgetScheduleLabel, getBudgetSpendTypeLabel } from "@/entities/budgets/budgets.lib"
import { getPaymentCurrency, getPaymentTypeLabel } from "@/entities/payment/payment.lib"
import { Budget } from "@/entities/budgets/budgets.types"
import { cn } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/button"
import { ButtonBottomCTA } from "@/shared/ui/cta"
import { Pencil } from 'lucide-react'
export function BudgetDetailViewer() {
    return (
        <Suspense fallback={<BudgetDetailSkeleton />}>
            <BudgetDetailContainer />
        </Suspense>
    )
}

function BudgetDetailContainer() {
    const params = useParams<{ id: string }>()
    const { data: budget } = useSuspenseQuery(budgetQueryOptions(Number(params.id)))
    return (
        <div className="px-4">
            <BaseBudgetDetailViewer
                budget={budget}
            />
        </div>
    )
}

interface BudgetDetailViewerProps {
    budget: Budget
}
function BaseBudgetDetailViewer(props: BudgetDetailViewerProps) {
    const { budget } = props
    return (
        <div className="flex flex-col min-h-screen">
            <BudgetDetailHeader budget={budget} />
            <BudgetDetailContent budget={budget} />
            <BudgetDetailFooter budget={budget} />
        </div>
    )
}


function BudgetDetailHeader({ budget }: { budget: Budget }) {
    return (
        <header className="w-full py-8 border-b flex justify-between items-center">
            <div>
                <h2 className="text-xl font-semibold">{budget.title}</h2>
                <p className={
                    cn(
                        "flex items-center gap-2",
                        "text-sm text-muted-foreground"
                    )
                }>
                    <span>{getPaymentTypeLabel(budget.paymentType)}</span>
                    {budget.schedules.map((schedule, idx) => (
                        <span key={budget.id + 'schedule_' + idx}>{getBudgetScheduleLabel(schedule)}</span>
                    ))}
                </p>
            </div>
            <BudgetEditActions budget={budget} />
        </header>
    )
}

function BudgetEditActions({ budget }: { budget: Budget }) {
    const router = useRouter()
    const onClick = () => router.push(`/budgets/${budget.id}/edit`)
    return <Button variant='ghost' size='icon-sm' onClick={onClick}><Pencil /></Button>
}

function BudgetDetailContent({ budget }: { budget: Budget }) {
    return (
        <div className="flex-1 py-4 px-1 flex flex-col gap-2">
            <InfoRow
                label="예산구분"
                value={getBudgetSpendTypeLabel(budget.spendType)}
            />
            <InfoRow
                label="예산금액"
                value={`${budget.value.toLocaleString()} ${getPaymentCurrency(budget.currency)}`}
            />
            <InfoRow
                label="결제수단"
                value={getPaymentTypeLabel(budget.paymentType)}
            />
            <InfoRow
                label="결제일"
                value={budget.schedules.map(getBudgetScheduleLabel)}
            />
        </div>
    )
}

function BudgetDetailFooter({ budget }: { budget: Budget }) {
    const router = useRouter()
    const onClick = () => router.back()
    return (
        <footer className="py-4">
            <ButtonBottomCTA className="w-full" onClick={onClick}>확인</ButtonBottomCTA>
        </footer>
    )
}

function InfoRow({ label, value }: { label: string, value: any }) {
    return (
        <div className={
            cn(
                "flex items-center justify-between",
                "",
            )
        }>
            <span className="text-gray-700">{label}</span>
            <span className="text-black font-semibold">{value}</span>
        </div>
    )
}