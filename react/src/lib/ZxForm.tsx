import ZxInput from "./ZxInput.tsx";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card.tsx"

import { Button } from "../components/ui/button.tsx";

import { z, ZodType } from "zod"
import { useState } from "react";

export type FormProps = {
  schema: z.ZodObject<any>;
  action?: string,
  method?: string | undefined
};

export default function ZxForm({ schema, action = "", method = "GET" }: FormProps) {
  let meta = schema.meta()
  let data: any = useState({});

  function onsubmit(event) {
    if (meta?.preventDefault || meta?.callback) {
      event.preventDefault();
    }

    let result = schema.safeParse(data)

    if (typeof meta?.callback === "function") {
      meta.callback(result.data);
    }
  }

  return (<Card className="mx-auto w-full max-w-sm">
    <CardHeader>
      <CardTitle className="text-2xl">{meta?.title ?? "Form"}</CardTitle>
      <CardDescription>{meta?.description ?? ""}</CardDescription>
    </CardHeader>
    <CardContent>
      <form noValidate onSubmit={onsubmit} className="grid gap-4" action={action} method={method}>
        {Object.entries(schema.shape).map(entry => {
          return (<ZxInput key={entry[0]} input={entry as [string, ZodType]} data={entry[1]}></ZxInput>)
        })}
        <Button type="submit" className="w-full hover:cursor-pointer">Submit</Button>
      </form>
    </CardContent>
  </Card>)
}