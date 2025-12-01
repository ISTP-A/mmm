"use client"

import { CreateBudgetForm } from "@/features/budgets/create-budget/create-budget.ui";
import { Button } from "@/shared/ui/button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export function CreateBudgetPage() {
    return (
        <div className="px-4 mb-4 min-h-screen flex flex-col">
            <AppHeader />
            <CreateBudgetHeader />
            <CreateBudgetForm />
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

function CreateBudgetHeader() {
    return (
        <header className="py-4">
            <strong className="text-xl">예산 정보 입력</strong>
            <p className="text-sm text-muted-foreground">예산정보를 입력해주세요</p>
        </header>
    )
}