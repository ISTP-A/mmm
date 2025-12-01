import {
    BudgetScheduleDtoSchema,
    CreateBudgetDtoSchema,
    CurrencySchema,
    defaultSchema,
    PaymentTypeSchema,
    SpendTypeSchema
} from "@/shared/api/api.contracts"
import z from "zod";

export const BudgetSchema = CreateBudgetDtoSchema.extend({
    ...defaultSchema.shape,
    title: z.string().min(1, "제목은 필수입니다."),
    currency: CurrencySchema,
    value: z
        .number()
        .int()
        .nonnegative()
        .describe("예산 금액(정수, 최소 0)"),
    spendType: SpendTypeSchema,
    paymentType: PaymentTypeSchema,
    schedules: z
        .array(BudgetScheduleDtoSchema)
        .min(1, "최소 1개 이상의 스케줄이 필요합니다."),
    totalValue: z.number().int(),
})

export const BudgetsSchema = z.object({
    budgets: z.array(BudgetSchema),
    count: z.number(),
})

export const BudgetPeriodSchema = z.object({
    first: z.date(),
    last: z.date(),
})

export const BudgetStatisticsSchema = z.object({
    totalBudget: z.number(),
    period: BudgetPeriodSchema
})