import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useId } from "react";
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
  _key: string; // For placeholder
  schema: z.ZodType;
  value: any;
  setValue: (key: any) => void;
}

export default function ZxInput({ schema, _key, value, setValue }: InputProps) {
  function uppercaseFirstLetter(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  // Get options

  console.log(`key: ${_key}, value: ${value}`)
  const id = useId();
  let meta = schema.meta();
  let optional = schema instanceof ZodOptional;


  let placeholder = (meta?.placeholder as string) ?? uppercaseFirstLetter(_key);
  let title = meta?.title ?? placeholder;
  let description = meta?.description;

  const [type, setType] = useState<string>("text");
  const [modified, setModified] = useState(false);

  // Set type and default value only when schema/meta changes
  // Avoids rerender loop
  useEffect(() => {
    let newType = "text";
    if (schema instanceof ZodNumber) {
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
    if (value === undefined && meta?.default !== undefined) {
      setValue(meta.default);
    }
  }, [schema, meta, type]);

  function onchange(e) {
    setModified(true)

    if (type == "number") {
      setValue(Number(e.target.value))
    } else if (type == "checkbox") {
      setValue(!value)
    } else if (type == "select") {
      setValue(e.target.value)
    } else {
      setValue(e.target.value)
    }
  }

  function onblur() {
    if (modified) {
      validate()
      setModified(false)
    }
  }

  function validate() {
    let result = schema.safeParse(value);

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
        <div dangerouslySetInnerHTML={{ __html: title }} />
        {!optional ? <sup><Asterisk size="12" color="#ff8080" /></sup> : null}
      </Label>

      {type === "checkbox" ? (
        <Checkbox
          id={`id-${id}`}
          checked={!!value}
          onClick={onchange}
        />
      ) : type === "select" ? (
        <Select
          onValueChange={onchange}
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
          onChange={onchange}
          onBlur={onblur}
          placeholder={placeholder}
        />
      )}

      <div dangerouslySetInnerHTML={{ __html: description ? description : "" }} />
    </div>
  )
}