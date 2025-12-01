import { formatDate } from "date-fns";
import { WeekdayDto, WeekPatternDto } from "../api/api.types";

export function formatSimpleDate(date: string | Date) {
    return formatDate(date, "yy. MM. dd")
}

export function formatFullDate(date: string | Date) {
    return formatDate(date, "yyyy.MM.dd")
}

export function formatLocaleDate(date: string | Date) {
    return formatDate(date, "yyyy년 MM월 dd일")
}

export function getWeekPatternToweekdays(pattern: WeekPatternDto): WeekdayDto[] {
    switch (pattern) {
        case "NONE":
            return []
        case "WEEKDAY":
            return ["MON", "TUE", "WED", "THU", "FRI"]
        case "WEEKEND":
            return ["SAT", "SUN"]
        case "ALL":
            return ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]
    }
}