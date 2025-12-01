import { AxiosResponse } from 'axios';
import { ZodType } from 'zod';
import { ApiErrorData, ApiErrorDataDto, WeekdayDto } from './api.types';


export const weekdayMap: Record<WeekdayDto, string> = {
    MON: "월요일",
    TUE: "화요일",
    WED: "수요일",
    THU: "목요일",
    FRI: "금요일",
    SAT: "토요일",
    SUN: "일요일",
}

export function responseContract<Data>(schema: ZodType<Data>) {
    return function parseResponse(response: AxiosResponse<unknown>): AxiosResponse<Data> {
        const data = schema.parse(response.data)
        return { ...response, data }
    }
}

export function normalizeValidationErrors(data: ApiErrorDataDto): ApiErrorData {
    return Object.entries(data.errors).flatMap(([field, messages]) => messages.map((message) => `${field} ${message}`))
}
