import { z } from "zod"
import type { Snippet } from "svelte";

export type FormProps = {
    schema: z.ZodObject<any>;
    action?: string,
    method?: "dialog" | "get" | "post" | "DIALOG" | "GET" | "POST" | null | undefined,
    header?: Snippet,
    footer?: Snippet,
};

export type InputProps = {
    input: [string, z.ZodType];
    data: any;
}
