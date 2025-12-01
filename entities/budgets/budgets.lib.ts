import { BudgetDto, BudgetScheduleDto, BudgetsDto, BudgetStatisticsDto, SpendTypeDto } from "@/shared/api/api.types"
import { Budget, Budgets, BudgetStatistics } from "./budgets.types"
import { weekdayMap } from "@/shared/api/api.lib"

export function transformBudgetsDtoToBudget(budgetsDto: BudgetsDto): Budgets {
    return budgetsDto
}

export function transformBudgetDtoToBudget(budgetsDto: BudgetDto): Budget {
    return budgetsDto.budget
}

export function transformBudgetStatisticsDtoToBudget(dto: BudgetStatisticsDto): BudgetStatistics {
    return dto
}

export function getBudgetScheduleLabel(schedule: BudgetScheduleDto): string {
    switch (schedule.type) {
        case "ONE_TIME": {
            if (!schedule.startDate) return "단발성 (날짜 없음)"
            return `${schedule.startDate} 단발성`
        }

        case "YEARLY": {
            if (!schedule.startDate) return "매년 (날짜 없음)"
            const d = new Date(schedule.startDate)
            const month = d.getMonth() + 1
            const day = d.getDate()
            return `매년 ${month}월 ${day}일`
        }

        case "MONTHLY": {
            if (!schedule.monthDays?.length) return "매월 (날짜 없음)"
            const days = schedule.monthDays.join("일, ") + "일"
            return `매월 ${days}`
        }

        case "WEEKLY": {
            if (!schedule.weekdays?.length) return "매주 (요일 없음)"
            const days = schedule.weekdays.map((w) => weekdayMap[w][0]).join(" · ")
            return `매주 ${days}`
        }

        case "DAILY":
            return "매일"
    }
}

export function getBudgetSpendTypeLabel(spendType: SpendTypeDto): string {
    switch (spendType) {
        case "SUBSCRIPTION":
            return "구독"
        case "RENT":
            return "월세"
        case "FOOD":
            return "음식"
    }
}