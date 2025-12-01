"use client"

import { CreateBudgetDtoSchema } from "@/shared/api/api.contracts"
import { ButtonBottomCTA } from "@/shared/ui/cta"
import { Form } from "@/shared/ui/form"
import { GridSelectItem, RHFItemSelectGroup } from "@/shared/ui/form/rhf-item-select"
import { RHFTextField } from "@/shared/ui/form/rhf-text-field"
import { zodResolver } from '@hookform/resolvers/zod'
import { Banknote, BanknoteArrowDown, Calendar, ChefHat, CreditCard, DollarSign, House, JapaneseYen, TvMinimalPlay } from "lucide-react"
import { useForm, useWatch } from "react-hook-form"
import { useCreateBudgetMutation } from "./create-budget.mutation"
import { DayPicker } from "@/shared/ui/day-picker"
import { Field, FieldLabel } from "@/shared/ui/field"
import { useEffect } from "react"
import { getWeekPatternToweekdays } from "@/shared/lib/date"
import { queryClient } from "@/shared/queryClient"
import { BUDGETS_ROOT_QUERY_KEY } from "@/entities/budgets/budgets.api"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function CreateBudgetForm() {
    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(CreateBudgetDtoSchema),
        defaultValues: {
            title: "",
            currency: "KRW",
            value: 0,
            spendType: undefined,
            paymentType: undefined,
            schedules: [
                {
                    type: 'MONTHLY',
                    monthDays: [],
                    weekdays: [],
                    weekPattern: 'NONE',
                    startDate: undefined,
                    endDate: undefined,
                }
            ],
        }
    })

    const schedules = useWatch({ control: form.control, name: 'schedules.0' })

    const createMutation = useCreateBudgetMutation({
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: BUDGETS_ROOT_QUERY_KEY })
            queryClient.invalidateQueries({ queryKey: [...BUDGETS_ROOT_QUERY_KEY, 'statistics'] })
            toast('성공적으로 등록되었습니다')
            router.replace('/budgets')
        },
        onError: (error) => {
            console.log(error)
            toast.error('저장 중 오류가 발생했습니다')
        }
    })

    const handleSubmit = form.handleSubmit(data => {
        createMutation.mutate(data)
    }, (error,) => console.log(form.getValues(), error))

    useEffect(() => {
        form.setValue('schedules.0.weekdays', getWeekPatternToweekdays(schedules.weekPattern))
    }, [schedules.weekPattern])

    return (
        <Form {...form}>
            <form
                className="flex-1 flex flex-col gap-4"
                onSubmit={handleSubmit}
            >
                <div className="flex-1 flex flex-col gap-10 py-4">
                    <RHFTextField
                        label='제목을 입력해주세요'
                        name='title'
                        placeholder="예산 제목을 입력해주세요"
                    />

                    <RHFTextField
                        label='금액을 입력해주세요'
                        name='value'
                        placeholder="예산을 입력해주세요"
                    />

                    <RHFItemSelectGroup
                        label='예산 지출일을 선택해주세요'
                        name='schedules.0.type'
                        className="grid grid-cols-3 gap-2"
                    >
                        {/* <GridSelectItem label='매년' value='YEARLY' icon={<Calendar size={20} />} /> */}

                        <GridSelectItem label='매월' value='MONTHLY' icon={<Calendar size={20} />} />
                        <GridSelectItem label='매주' value='WEEKLY' icon={<Calendar size={20} />} />
                        <GridSelectItem label='매일' value='DAILY' icon={<Calendar size={20} />} />
                    </RHFItemSelectGroup>
                    {schedules.type && (() => {
                        switch (schedules.type) {
                            case "MONTHLY":
                                return (
                                    <Field>
                                        <FieldLabel>지출일을 선택해주세요</FieldLabel>
                                        <DayPicker
                                            variant="multiple"
                                            onChange={(value) => form.setValue("schedules.0.monthDays", value)}
                                        />
                                    </Field>
                                )
                            case "ONE_TIME":
                                return null
                            case "YEARLY":
                                return null
                            case "WEEKLY":
                                return (
                                    <RHFItemSelectGroup
                                        name='schedules.0.weekPattern'
                                        label="언제 지출하시나요?"
                                        className="grid grid-cols-3 gap-2"
                                    >
                                        <GridSelectItem label='매일' value='ALL' />
                                        <GridSelectItem label='매일(평일)' value='WEEKDAY' />
                                        <GridSelectItem label='매일(주말)' value='WEEKEND' />
                                        <GridSelectItem label='직접선택' value='NONE' />
                                    </RHFItemSelectGroup>
                                )
                            case "DAILY":
                                return null
                            default:
                                return null
                        }
                    })()}

                    {schedules.type === "WEEKLY" && (
                        <RHFItemSelectGroup
                            label='지출요일을 선택해주세요'
                            name='schedules.0.weekdays'
                            className="grid grid-cols-7 gap-1"
                            variant="multiple"
                            disabled={schedules.weekPattern !== 'NONE'}
                        >
                            <GridSelectItem label='월' value="MON" />
                            <GridSelectItem label='화' value="TUE" />
                            <GridSelectItem label='수' value="WED" />
                            <GridSelectItem label='목' value="THU" />
                            <GridSelectItem label='금' value="FRI" />
                            <GridSelectItem label='토' value="SAT" />
                            <GridSelectItem label='일' value="SUN" />
                        </RHFItemSelectGroup>
                    )}

                    <RHFItemSelectGroup
                        name='spendType'
                        label='카테고리를 선택해주세요'
                        className="grid grid-cols-3 gap-2"
                    >
                        <GridSelectItem label='구독서비스' value='SUBSCRIPTION' icon={<TvMinimalPlay size={20} />} />
                        <GridSelectItem label='집세' value='RENT' icon={<House size={20} />} />
                        <GridSelectItem label='식비' value='FOOD' icon={<ChefHat size={20} />} />
                    </RHFItemSelectGroup>

                    <RHFItemSelectGroup
                        name='currency'
                        label='결제 통화를 선택해주세요'
                        className="grid grid-cols-3 gap-2"
                    >
                        <GridSelectItem label='KRW' value='KRW' icon={<Banknote size={20} />} />
                        <GridSelectItem label='USD' value='USD' icon={<DollarSign size={20} />} />
                        <GridSelectItem label='JPY' value='JPY' icon={<JapaneseYen size={20} />} />
                    </RHFItemSelectGroup>

                    <RHFItemSelectGroup
                        name='paymentType'
                        label='결제방식을 선택해주세요'
                        className="grid grid-cols-3 gap-2"
                    >
                        <GridSelectItem label='카드결제' value='CARD' icon={<CreditCard size={20} />} />
                        <GridSelectItem label='현금' value='CASH' icon={<Banknote size={20} />} />
                        <GridSelectItem label='계좌이체' value='ACCOUNT' icon={<BanknoteArrowDown size={20} />} />
                    </RHFItemSelectGroup>
                </div>

                <div className="py-4">
                    <ButtonBottomCTA type='submit'>다음</ButtonBottomCTA>
                </div>
            </form>
        </Form>
    )
}
