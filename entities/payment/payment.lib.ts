import { CurrencyDto } from "@/shared/api/api.types";
import { PaymentType } from "./payment.types";

export function getPaymentTypeLabel(type: PaymentType): string {
    switch (type) {
        case "CARD":
            return "카드결제"
        case "CASH":
            return "현금결제"
        case "ACCOUNT":
            return "계좌이체"
    }
}

export function getPaymentCurrency(currency: CurrencyDto): string {
    switch (currency) {
        case "KRW":
            return "원"
        case "USD":
            return "USD"
    }
}