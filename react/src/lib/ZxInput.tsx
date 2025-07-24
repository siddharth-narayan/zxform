import { Input } from "../components/ui/input";
import { v4 as uuidv4 } from "uuid";
import { Label } from "../components/ui/label";
import { skipFirstSubscribe, uppercaseFirstLetter } from "@/lib/misc";
import { Checkbox } from "../components/ui/checkbox.tsx";
import { Asterisk } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select.tsx"

import {
  z,
  ZodBoolean,
  ZodEnum,
  ZodNumber,
  ZodOptional,
  ZodString,
} from "zod";
import { useState, useEffect } from "react";

type InputProps = {
  input: [string, z.ZodType];
  data: any;
}

export default function ZxInput({ input, data }: InputProps) {
  function uppercaseFirstLetter(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  let [key, schema] = input;

  // Get options
  let id = uuidv4(); // TODO: Change this eventually
  let meta = schema.meta();
  let optional = schema instanceof ZodOptional;
  let placeholder = (meta?.placeholder as string) ?? uppercaseFirstLetter(key);
  let title = meta?.title ?? placeholder;
  let description = meta?.description;

  const [type, setType] = useState<string>(typeof meta?.type === "string" ? meta.type : "text");
  const [value, setValue] = useState<any>(
    data[key] !== undefined ? data[key] : meta?.default
  );

  // Set type and default value only when schema/meta changes
  // Avoids rerender loop
  useEffect(() => {
    let newType = "text";
    if (schema instanceof ZodString) {
      newType = "text";
    } else if (schema instanceof ZodNumber) {
      newType = "number";
    } else if (schema instanceof ZodBoolean) {
      newType = "checkbox";
    } else if (schema instanceof ZodEnum) {
      newType = "select";
    }
    if (meta?.type) {
      newType = meta.type as string;
    }
    setType(newType);

    // Set default value if not already set
    if (data[key] === undefined && meta?.default !== undefined) {
      setValue(meta.default);
    }
  }, [schema, meta, key]);

  // Keep data[key] in sync with value
  useEffect(() => {
    data[key] = value;
  }, [value, key, data]);

  function onchange() {
    validate();
  }

  function validate() {
    let result = schema.safeParse(data[key]);
    // console.log(result);

    let element: HTMLInputElement = document.getElementById(
      `id-${id}`,
    ) as HTMLInputElement;

    if (!element) {
      console.log(id);
      return;
    }

    if (!result.success) {
      element.setCustomValidity(result.error.issues[0].message);
      element.reportValidity();
      element.setAttribute("aria-invalid", "true");
    } else {
      element.setCustomValidity(""); // Remove invalid
      element.setAttribute("aria-invalid", "false");
    }
  }


  return (
    <div className="grid gap-2">
      <Label htmlFor={`id-${id}`} className="gap-0">
        {title}
        {!optional ? <sup><Asterisk size="12" color="#ff8080" /></sup> : null}
      </Label>

      {type === "checkbox" ? (
        <Checkbox
          id={`id-${id}`}
          checked={!!value}
          onClick={() => { setValue(!value); onchange(); }}
        />
      ) : type === "select" ? (
        <Select
          value={value}
          onValueChange={val => { setValue(val); onchange(); }}
        >
          <SelectTrigger id={`id-${id}`}>
            {value !== "" ? value : placeholder}
          </SelectTrigger>
          <SelectContent>
            {(schema as ZodEnum<any>).options.map((option: string) => (
              <SelectItem key={option} value={option}>{option}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input
          id={`id-${id}`}
          type={type}
          onChange={e => { setValue((e.target as HTMLInputElement).value); onchange(); }}
          placeholder={placeholder}
          value={value}
        />
      )}

      {description ? <p className="text-muted-foreground text-sm">{description}</p> : null}
    </div>
  );

}