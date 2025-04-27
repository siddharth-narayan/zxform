import { z, ZodObject, ZodTypeAny } from "zod"

export function buildForm<T extends ZodTypeAny>(schema: T, style?: any) {
    if (schema instanceof ZodObject) {
        for (const [key, value] of Object.entries(schema.shape)) {
            console.log(key + ": ")
            console.log(value)
        }
    }
}

let schema = z.object({
    name: z.string(),
    birthday: z.date(),
    color: z.string(),
    a: z.
})

buildForm(schema)