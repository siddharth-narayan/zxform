<script lang="ts">
  import { Asterisk } from "@lucide/svelte";
  import { v4 as uuidv4 } from "uuid";
  import { ZodBoolean, ZodEnum, ZodNumber, ZodOptional, ZodString } from "zod";

  import Input from "$lib/components/ui/input/input.svelte";
  import Label from "$lib/components/ui/label/label.svelte";
  import Checkbox from "./components/ui/checkbox/checkbox.svelte";
  import * as Select from "./components/ui/select/index.js";

  import { skipFirstSubscribe, uppercaseFirstLetter } from "./misc.js";
  import { type InputProps } from "./types.js";
  import { validate_callback } from "./validate-store.js";
  import Textarea from "./components/ui/textarea/textarea.svelte";

  let { input, data = $bindable() }: InputProps = $props();
  let [key, schema] = input;

  // Get options
  let id = uuidv4(); // TODO: Change this eventually
  let meta = schema.meta();
  let title = meta?.title ?? uppercaseFirstLetter(key);
  let placeholder = (meta?.placeholder as string) ?? title;
  let description = meta?.description;
  let optional = schema instanceof ZodOptional;

  let baseSchema = optional ? (schema as ZodOptional<any>).unwrap() : schema;

  let type = $state("text");
  data[key] = meta?.default;

  if (baseSchema instanceof ZodString) {
  } else if (baseSchema instanceof ZodNumber) {
    type = "number";
  } else if (baseSchema instanceof ZodBoolean) {
    type = "checkbox"; // TODO: Make it radio buttons so that there can be optional variants
    data[key] = meta?.default ?? false;
  } else if (schema instanceof ZodEnum) {
    type = "select";
  }

  if (meta?.type) {
    type = meta.type as string;
  }

  skipFirstSubscribe(validate_callback, () => {
    validate();
  });

  function onchange() {
    validate();
  }

  function validate() {
    let result = schema.safeParse(data[key]);
    // console.log(result);

    let element: HTMLInputElement = document.getElementById(
      `id-${id}`
    ) as HTMLInputElement;

    if (!element) {
      // console.log(id);
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
</script>

<div class="grid gap-2">
  <Label for="id-{id}" class="gap-0"
    >{@html title}
    {#if !optional}
      <sup><Asterisk size="12" color="#ff8080" /></sup>
    {/if}
  </Label>

  {#if type == "checkbox"}
    <Checkbox id="id-{id}" bind:checked={data[key]} onclick={onchange} />
  {:else if type == "select"}
    <Select.Root type="single" bind:value={data[key]}>
      <Select.Trigger id="id-{id}"
        >{data[key] != "" ? data[key] : placeholder}</Select.Trigger
      >
      <Select.Content>
        {#each (schema as ZodEnum<any>).options as option}
          <Select.Item value={option}>{option}</Select.Item>
        {/each}
      </Select.Content>
    </Select.Root>
  {:else if type == "textarea"}
    <Textarea
      id="id-{id}"
      {onchange}
      {placeholder}
      bind:value={data[key]}
    />
  {:else}
    <!-- This is the fallback case, it should be good for the majority of input types -->
    <Input
      id="id-{id}"
      {type}
      {onchange}
      {placeholder}
      bind:value={data[key]}
    />
  {/if}

  {#if description}
    <p class="text-muted-foreground text-sm">{@html description}</p>
  {/if}
</div>
