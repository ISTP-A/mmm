"use client"

import { BudgetList } from "@/widgets/budget-list/budget-list.ui"
import { BudgetStat } from "@/features/budgets/budget-stat/budget-stat.ui"
import { BudgetSort } from "@/features/budgets/budget-filter/budget-filter.ui"
import { Button } from "@/shared/ui/button"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

export function BudgetsRenderPage() {
    return (
        <div className="w-full min-h-screen flex flex-col">
            <Controller />
            <BudgetStat />
            <BudgetSort />
            <BudgetList />
        </div>
    )
}


function Controller() {
    const router = useRouter()
    const onClick = () => router.push('/budgets/regist')
    return (
        <div className="absolute p-4 flex right-0 top-0 z-10">
            <Button variant='ghost' size='icon' onClick={onClick}><Plus /></Button>
        </div>
    )
}