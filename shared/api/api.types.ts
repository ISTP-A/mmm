import { z } from 'zod'

import {
    ApiErrorDataDtoSchema,
    ApiErrorDataSchema,
    CreateBudgetDtoSchema,
    BudgetScheduleDtoSchema,
    CurrencySchema,
    PaymentTypeSchema,
    ScheduleTypeSchema,
    SpendTypeSchema,
    WeekdaySchema,
    WeekPatternSchema,
    UpdateBudgetDtoSchema,
    BudgetDtoSchema,
    BudgetsDtoSchema,
    BudgetStatisticsDtoSchema,
} from './api.contracts'

export type CurrencyDto = z.infer<typeof CurrencySchema>
export type SpendTypeDto = z.infer<typeof SpendTypeSchema>
export type PaymentTypeDto = z.infer<typeof PaymentTypeSchema>
export type ScheduleTypeDto = z.infer<typeof ScheduleTypeSchema>
export type WeekPatternDto = z.infer<typeof WeekPatternSchema>
export type WeekdayDto = z.infer<typeof WeekdaySchema>

export type BudgetDto = z.infer<typeof BudgetDtoSchema>
export type BudgetsDto = z.infer<typeof BudgetsDtoSchema>
export type BudgetScheduleDto = z.infer<typeof BudgetScheduleDtoSchema>
export type BudgetStatisticsDto = z.infer<typeof BudgetStatisticsDtoSchema>
export type CreateBudgetDto = z.infer<typeof CreateBudgetDtoSchema>
export type UpdateBudgetDto = z.infer<typeof UpdateBudgetDtoSchema>


export type ApiErrorDataDto = z.infer<typeof ApiErrorDataDtoSchema>
export type ApiErrorData = z.infer<typeof ApiErrorDataSchema>
