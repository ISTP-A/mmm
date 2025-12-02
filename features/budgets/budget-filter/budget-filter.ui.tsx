"use client"

import { Button } from "@/shared/ui/button"
import { Banknote, BanknoteArrowDown, ChefHat, CreditCard, House, Menu, RotateCcw, TvMinimalPlay } from "lucide-react"

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/shared/ui/drawer"
import { Form } from "@/shared/ui/form"
import { GridSelectItem, RHFItemSelectGroup } from "@/shared/ui/form/rhf-item-select"
import { useForm } from "react-hook-form"
import { useRouter, useSearchParams } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import { BUDGETS_ROOT_QUERY_KEY } from "@/entities/budgets/budgets.api"
import { cn } from "@/shared/lib/utils"

type SpendType = "SUBSCRIPTION" | "RENT" | "FOOD"
type PaymentType = "CARD" | "CASH" | "ACCOUNT"

interface FilterFormValues {
    spendType: SpendType[]
    paymentType: PaymentType[]
}

const filterDefaultValue: FilterFormValues = {
    spendType: [],
    paymentType: [],
}

export function BudgetSort() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const sorting = searchParams.get('sort')

    const onClick = (value: string) => () => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('sort', value)

        const query = params.toString()
        router.push(query ? `?${query}` : "?", { scroll: false })
    }

    return (
        <div className="h-12 border-b flex items-center justify-between px-4 font-medium">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <SortItem
                    label='최신순'
                    onClick={onClick('recent')}
                    selected={sorting === 'recent'}
                />
                <span>|</span>
                <SortItem
                    label='금액 높은 순'
                    onClick={onClick('most')}
                    selected={sorting === 'most'}
                />
            </div>
            <FilterDrawer />
        </div>
    )
}

function SortItem({
    label,
    onClick,
    selected
}: {
    label: string
    onClick: () => void
    selected?: boolean
}) {
    return <span className={cn('cursor-pointer', selected && 'text-primary font-semibold')} onClick={onClick}>{label}</span>
}

export function FilterDrawer() {
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant='ghost' size='icon-sm'><Menu /></Button>
            </DrawerTrigger>
            <BudgetFilterDrawerForm />
        </Drawer>
    )
}

function BudgetFilterDrawerForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const queryClient = useQueryClient()

    const spendTypeFromUrl = searchParams.getAll("spendType") as SpendType[]
    const paymentTypeFromUrl = searchParams.getAll("paymentType") as PaymentType[]

    const form = useForm<FilterFormValues>({
        defaultValues: {
            spendType: spendTypeFromUrl.length ? spendTypeFromUrl : [],
            paymentType: paymentTypeFromUrl.length ? paymentTypeFromUrl : [],
        },
    })

    const handleSubmit = form.handleSubmit(data => {
        const params = new URLSearchParams(searchParams.toString())

        params.delete("spendType")
        params.delete("paymentType")

        data.spendType.forEach(v => params.append("spendType", v))
        data.paymentType.forEach(v => params.append("paymentType", v))

        const query = params.toString()
        router.push(query ? `?${query}` : "?", { scroll: false })
    })

    const handleReset = () => {
        form.reset(filterDefaultValue)

        const params = new URLSearchParams(searchParams.toString())
        params.delete("spendType")
        params.delete("paymentType")

        const query = params.toString()
        router.push(query ? `?${query}` : "?", { scroll: false })

        queryClient.invalidateQueries({
            queryKey: [BUDGETS_ROOT_QUERY_KEY, "list"],
        })
        queryClient.invalidateQueries({
            queryKey: [BUDGETS_ROOT_QUERY_KEY, "statistics"],
        })
    }

    return (
        <DrawerContent>
            <Form {...form}>
                <form className="px-4" onSubmit={handleSubmit}>
                    <DrawerHeader className="px-0 flex-row items-baseline justify-between">
                        <DrawerTitle>필터 선택</DrawerTitle>
                        <Button
                            type='button'
                            variant='ghost'
                            onClick={handleReset}
                        >
                            초기화 <RotateCcw />
                        </Button>
                    </DrawerHeader>
                    <div className="flex flex-col gap-8">
                        <SpendTypeFilter />
                        <PaymentTypeFilter />
                    </div>
                    <DrawerFooter className="px-0">
                        <DrawerClose asChild>
                            <Button type="submit">적용</Button>
                        </DrawerClose>
                        <DrawerClose asChild>
                            <Button type="button" variant="outline">취소</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </form>
            </Form>
        </DrawerContent>
    )
}

function SpendTypeFilter() {
    return (
        <RHFItemSelectGroup
            name='spendType'
            label='카테고리를 선택해주세요'
            className="grid grid-cols-3 gap-2"
            variant="multiple"
        >
            <GridSelectItem label='구독서비스' value='SUBSCRIPTION' icon={<TvMinimalPlay size={20} />} />
            <GridSelectItem label='집세' value='RENT' icon={<House size={20} />} />
            <GridSelectItem label='식비' value='FOOD' icon={<ChefHat size={20} />} />
        </RHFItemSelectGroup>
    )
}

function PaymentTypeFilter() {
    return (
        <RHFItemSelectGroup
            name='paymentType'
            label='결제방식을 선택해주세요'
            className="grid grid-cols-3 gap-2"
            variant="multiple"
        >
            <GridSelectItem label='카드결제' value='CARD' icon={<CreditCard size={20} />} />
            <GridSelectItem label='현금' value='CASH' icon={<Banknote size={20} />} />
            <GridSelectItem label='계좌이체' value='ACCOUNT' icon={<BanknoteArrowDown size={20} />} />
        </RHFItemSelectGroup>
    )
}
