<script lang="ts">
  import { Input } from "@/lib/components/ui/input";
  import { v4 as uuidv4 } from "uuid";
  import { Label } from "@/lib/components/ui/label";
  import { uppercaseFirstLetter } from "@/lib/misc";
  import { type InputProps } from "@/lib/types";
  import { Checkbox } from "@/lib/components/ui/checkbox";

  import { z, ZodBoolean, ZodEnum, ZodNumber, ZodString } from "zod";

  let { input, data = $bindable() }: InputProps = $props();
  let [key, schema] = input;

  let meta = schema.meta()
  
  let placeholder = uppercaseFirstLetter(key);
  let edited = $state(false);

  let type = $state("");
    data[key] = meta?.default ?? "";
  if (schema instanceof ZodString) {
    type = "text";
    data[key] = ""
  } else if (schema instanceof ZodBoolean) {
    type = "checkbox";
    data[key] = meta?.default ?? false;
  } else if (schema instanceof ZodNumber) {
    type = "number";
  } else if (schema instanceof ZodEnum) {
    type = "select";
  }

  if (meta?.type) {
    type = meta.type as string
  }

  function onchange() {
    edited = true;

    validate();
  }

  let id = uuidv4();

  function validate() {
    let result = schema.safeParse(data[key]);
    console.log(result);

    let element: HTMLInputElement = document.getElementById(
      `id-${id}`
    ) as HTMLInputElement;

    let errorOnMoveOut = true;
    if (!result.success) {
      console.log(result.error.issues[0].message);
      if (errorOnMoveOut) {
        element.setCustomValidity(result.error.issues[0].message);
        element.reportValidity();
        element.setAttribute("aria-invalid", "true");
        console.log(element.validity.valid);
      }
    } else {
      element.setCustomValidity(""); // Remove invalid
      element.setAttribute("aria-invalid", "false");
    }
  }
</script>

<div class="grid gap-2">
  <Label for="id-{id}">{meta?.title ?? placeholder}</Label>

  {#if type != "checkbox"}
    <Input
      id="id-{id}"
      {type}
      {onchange}
      {placeholder}
      bind:value={data[key]}
    />
  {:else}
    <Checkbox id="id-{id}" bind:checked={data[key]} onclick={onchange}/>
  {/if}

  {#if meta?.description}
    <p class="text-muted-foreground text-sm">{meta?.description}</p>
  {/if}
</div>
