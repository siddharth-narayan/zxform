import { z } from "zod"

export let optionsSchema = z.object({
    title: z.string(),
    styles: z.object({
        form: z.object({

        }),
        input: z.object({

        })
    })
})