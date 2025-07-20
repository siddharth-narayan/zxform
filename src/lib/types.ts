import { z } from "zod"
import type * as CSS from 'csstype';

export type FormProps = {
    schema: z.ZodTypeAny;
    action: string,
    method: "dialog" | "get" | "post" | "DIALOG" | "GET" | "POST" | null | undefined
};


export type InputProps = {
    input: [string, z.ZodType];
    data: any;
    styles?: Partial<Styles>;
    options?: Partial<Options>
}

export type Styles = {
    form: {
        form:  CSS.Properties;
        submit:  CSS.Properties;
    };

    input: {
        label: CSS.Properties;
        input:  CSS.Properties;
        text:  CSS.Properties;
        checkbox:  CSS.Properties;
    };
};

export type Options = {
    title: string;
    description: string;
    trimInput: boolean;
    errorOnMoveOut: boolean;
};