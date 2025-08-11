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
import { JSX, useState } from "react";

export type FormProps = {
  schema: z.ZodObject<any>;
  action?: string,
  method?: string | undefined,
  header?: JSX.Element,
  footer?: JSX.Element
};

export default function ZxForm({ schema, action = "", method = "GET", header, footer }: FormProps) {
  let meta = schema.meta()
  let [data, setData] = useState({});

  // returns setKey functions for each input
  function setKeyGen(key: any) {
    return (value) => {
      setData(prev => ({
        ...prev,
        [key]: value
      }))
    }
  }
  
  function onsubmit(event) {
    if (meta?.preventDefault || meta?.callback) {
      event.preventDefault();
    }

    let result = schema.safeParse(data)
    
    if (!result.success) {
      return
    }

    if (typeof meta?.callback === "function") {
      meta.callback(result.data);
    }
  }

  return (<Card className="mx-auto w-full max-w-sm">
    <CardHeader>
      {header ? <header /> : 
      <><CardTitle className="text-2xl">{meta?.title ?? "Form"}</CardTitle><CardDescription>{meta?.description ?? ""}</CardDescription></>
      }
    </CardHeader>
    <CardContent>
      <form noValidate onSubmit={onsubmit} className="grid gap-4" action={action} method={method}>
        {Object.entries(schema.shape).map(entry => {
          let [key, schema] = entry
          return (<ZxInput key={key} _key={key} schema={schema as ZodType} value={data[key]} setValue={setKeyGen(key)}></ZxInput>)
        })}
        <Button type="submit" className="w-full hover:cursor-pointer">Submit</Button>
      </form>

      {footer ? <footer /> : null}
    </CardContent>
  </Card>)
}