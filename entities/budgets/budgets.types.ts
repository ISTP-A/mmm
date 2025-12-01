import z from "zod"
import { BudgetSchema, BudgetsSchema, BudgetStatisticsSchema } from "./budgets.contracts"

export type Budget = z.infer<typeof BudgetSchema>
export type Budgets = z.infer<typeof BudgetsSchema>
export type BudgetStatistics = z.infer<typeof BudgetStatisticsSchema>