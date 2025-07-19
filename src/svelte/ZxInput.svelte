<script lang="ts">
  import Input from "@/lib/components/ui/input/input.svelte";
    import { defaultStyle } from "@/lib/defaults";
    import { uppercaseFirstLetter } from "@/lib/misc";
    import { type InputProps } from "@/lib/types";
    import { css } from "@emotion/css";
    import { z, ZodBoolean, ZodEnum, ZodNumber, ZodString } from "zod";

    let { input, data = $bindable(), styles, options }: InputProps = $props();
    let [key, schema] = input;

    let placeholder = uppercaseFirstLetter(key);
    let edited = $state(false);

    function onchange() {
        edited = true;

        validate()        
    }

    function validate() {
        let result = schema.safeParse(data[key]);
        console.log(result);
        if (!result.success) {
            console.log(result.error);

            if (options.errorOnMoveOut) {

            }

        } else {
            if (options.errorOnMoveOut) {
            };
        }

    }
</script>

<form>

    
    <label>{placeholder + ":"}

        {#if schema instanceof ZodString}
            <Input
                type="text"
                {onchange}
                {placeholder}
                bind:value={data[key]}
            />
        {:else if schema instanceof ZodBoolean}
            <input
                type="checkbox"
                onchange={() => {
                    onchange();
                    console.log(data[key]);
                }}
                {placeholder}
                bind:checked={data[key]}
            />
        {:else if schema instanceof ZodNumber}
            <input
                type="number"
                {onchange}
                onkeypress={(e) => {
                    if (isNaN(e.key)) {
                        e.preventDefault();
                    }
                }}
                {placeholder}
                bind:value={data[key]}
            />
        {:else if schema instanceof ZodEnum}
            <select>
                {#each schema.options as option}
                    <option value="" placeholder={key}></option>
                {/each}
            </select>
        {/if}
    </label>
</form>