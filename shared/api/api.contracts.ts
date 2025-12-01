import z from "zod"

export const CurrencySchema = z.enum([
    "KRW",
    "USD",
    "JPY"
])

export const SpendTypeSchema = z.enum([
    "SUBSCRIPTION",
    "RENT",
    "FOOD",
])

export const PaymentTypeSchema = z.enum([
    "CARD",
    "CASH",
    "ACCOUNT",
])

export const ScheduleTypeSchema = z.enum([
    'ONE_TIME',
    'YEARLY',
    'MONTHLY',
    'WEEKLY',
    'DAILY',
])

export const WeekPatternSchema = z.enum([
    "NONE",
    "WEEKDAY",
    "WEEKEND",
    "ALL",
])

export const WeekdaySchema = z.enum([
    "MON",
    "TUE",
    "WED",
    "THU",
    "FRI",
    "SAT",
    "SUN",
])

export const defaultSchema = z.object({
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
})

export const BudgetScheduleDtoSchema = z.object({
    type: ScheduleTypeSchema,
    monthDays: z
        .array(z.number().int().min(1).max(31))
        .default([]),
    weekdays: z.array(WeekdaySchema).default([]),
    weekPattern: WeekPatternSchema,
    startDate: z.date().nullish(),
    endDate: z.date().nullish(),
})

export const BudgetDtoSchema = z.object({
    budget: z.object({
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
        totalValue: z.number().int()
    })
})

export const BudgetsDtoSchema = z.object({
    budgets: z.array(BudgetDtoSchema.shape.budget),
    count: z.number(),
})

export const BudgetPeriodDtoSchema = z.object({
    first: z.coerce.date(),
    last: z.coerce.date(),
})

export const BudgetStatisticsDtoSchema = z.object({
    totalBudget: z.number(),
    period: BudgetPeriodDtoSchema,
})

export const CreateBudgetDtoSchema = z.object({
    title: z.string().min(1, "제목은 필수입니다."),
    currency: CurrencySchema,
    value: z
        .coerce
        .number('숫자를 입력해주세요')
        .int()
        .nonnegative()
        .describe("예산 금액(정수, 최소 0)"),
    spendType: SpendTypeSchema,
    paymentType: PaymentTypeSchema,
    schedules: z
        .array(BudgetScheduleDtoSchema)
        .min(1, "최소 1개 이상의 스케줄이 필요합니다."),
})

export const UpdateBudgetDtoSchema = z.object({
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
})


export const ApiErrorDataDtoSchema = z.object({
    errors: z.record(z.string(), z.array(z.string())),
})

export const ApiErrorDataSchema = z.array(z.string())
