import { z } from "zod"
import type * as CSS from 'csstype';

export type FormProps = {
    schema: z.ZodObject<any>;
    action?: string,
    method?: "dialog" | "get" | "post" | "DIALOG" | "GET" | "POST" | null | undefined
};

export type InputProps = {
    input: [string, z.ZodType];
    data: any;
}
