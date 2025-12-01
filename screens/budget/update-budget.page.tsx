"use client"

import { UpdateBudget } from "@/features/budgets/update-budget/update-budget.ui"
import { Button } from "@/shared/ui/button"
import { X } from "lucide-react"
import { useRouter } from "next/navigation"

export function UpdateBudgetPage() {
    return (
        <div className="px-4 mb-4 min-h-screen flex flex-col">
            <AppHeader />
            <UpdateBudgetHeader />
            <UpdateBudget />
        </div>
    )
}

function BackArrow() {
    const router = useRouter()
    const onClick = () => router.back()
    return <Button variant='ghost' size='icon-lg' onClick={onClick}>{<X />}</Button>
}

function AppHeader() {
    return (
        <div className="pt-4 flex items-center justify-end top-0 right-0">
            <BackArrow />
        </div>
    )
}

function UpdateBudgetHeader() {
    return (
        <header className="py-4">
            <strong className="text-xl">예산 정보 수정</strong>
            <p className="text-sm text-muted-foreground">예산정보를 입력해주세요</p>
        </header>
    )
}