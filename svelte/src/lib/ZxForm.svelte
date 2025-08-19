<script lang="ts">
  import "./app.css";
  import { sort } from "fast-sort";
  import { ZodAny, ZodType } from "zod";

  import * as Card from "./components/ui/card/index.js";
  import Button from "./components/ui/button/button.svelte";
  import ZxInput from "./ZxInput.svelte";

  import { type FormProps } from "./types.js";
  import { validate_callback } from "./validate-store.js";

  let {
    schema,
    action = "",
    method = "GET",
    header,
    footer,
    extraInputs,
  }: FormProps = $props();

  let meta = schema.meta();
  let data: any = $state({});
  extraInputs = sort(extraInputs ?? []).asc((input) => input.index);

  function onsubmit(event: SubmitEvent) {
    if (meta?.callback) {
      event.preventDefault();
    }

    validate_callback.update((value) => !value);
    let result = schema.safeParse(data);

    console.log(result);
    if (!result.success) {
      event.preventDefault();
      // TODO: Add in validate() on the inputs so that they turn red
      return;
    }

    console.log(meta?.callback);
    if (typeof meta?.callback === "function") {
      meta.callback(result.data);
    }
  }
</script>

<Card.Root class="mx-auto w-full max-w-sm zxform">
  <Card.Header>
    {#if header}
      {@render header()}
    {:else}
      <Card.Title class="text-2xl">{@html meta?.title ?? "Form"}</Card.Title>
      <Card.Description>{@html meta?.description ?? ""}</Card.Description>
    {/if}
  </Card.Header>
  <Card.Content>
    <form novalidate {onsubmit} class="grid gap-4" {action} {method}>
      {#each Object.entries(schema.shape) as [key, value]}
        {console.log(value instanceof ZodAny)}
        <ZxInput input={[key, value as ZodType<any, any>]} bind:data></ZxInput>
      {/each}

      <Button type="submit" class="w-full hover:cursor-pointer"
        >{@html meta?.submitName ? meta?.submitName : "Submit"}</Button
      >
    </form>

    {@render footer?.()}
  </Card.Content>
</Card.Root>
