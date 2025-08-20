import { z } from "zod"
import type { Component, Snippet } from "svelte";

export type FormProps = {
    schema: z.ZodObject<any>;
    action?: string,
    method?: "dialog" | "get" | "post" | "DIALOG" | "GET" | "POST" | null | undefined,
    header?: Snippet,
    footer?: Snippet,
    extraInputs?: {index: number, component: Snippet}[]
};

export type CustomInputType = Component<{data: any; validate?: () => boolean}, {}, "data">
export type InputProps = {
    input: [string, z.ZodType];
    data: any;
}
