<script lang="ts">
  import { Input } from "@/lib/components/ui/input";
  import { Label } from "@/lib/components/ui/label";
  import { uppercaseFirstLetter } from "@/lib/misc";
  import { type InputProps } from "@/lib/types";

  import { uuidv4, z, ZodBoolean, ZodEnum, ZodNumber, ZodString } from "zod";

  let { input, data = $bindable() }: InputProps = $props();
  let [key, schema] = input;

  let placeholder = uppercaseFirstLetter(key);
  let edited = $state(false);

  function onchange() {
    edited = true;

    validate();
  }

  let id = uuidv4();

  function onkeypress(e) {
    if (isNaN(e.key)) {
      e.preventDefault();
    }
  }

  function validate() {
    let result = schema.safeParse(data[key]);
    console.log(result);
    // if (!result.success) {
    //   console.log(result.error);

    //   if (options.errorOnMoveOut) {
    //   }
    // } else {
    //   if (options.errorOnMoveOut) {
    //   }
    // }
  }
</script>

<div class="grid gap-2">
  {#if schema instanceof ZodString}
    <Label for="id-{id}">{placeholder}</Label>
    <Input
      id="id-{id}"
      type="text"
      {onchange}
      {placeholder}
      bind:value={data[key]}
    />
  <!-- {:else if schema instanceof ZodBoolean}
    <Label for="id-{id}">{placeholder}</Label>
    <Input
      id="id-{id}"
      type="checkbox"
      {onchange}
      {onkeypress}
      {placeholder}
      
    /> -->
    <!-- {:else if schema instanceof ZodNumber}
    <Label for="email-{id}">{placeholder + ":"}</Label>
    <Input type="number" {onchange} {placeholder} bind:value={data[key]} />
  {:else if schema instanceof ZodEnum}
    <Label for="email-{id}">{placeholder + ":"}</Label>
    <select>
      {#each schema.options as option}
        <option value="" placeholder={key}></option>
      {/each}
    </select> -->
  {/if}
</div>
