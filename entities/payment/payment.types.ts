import { PaymentTypeSchema } from "@/shared/api/api.contracts"
import z from "zod"

export type PaymentType = z.infer<typeof PaymentTypeSchema>