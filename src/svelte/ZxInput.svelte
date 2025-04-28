<script lang="ts">
    import { uppercaseFirstLetter } from "@/lib/misc";
    import { z, ZodBoolean, ZodEnum, ZodNumber, ZodString } from "zod";

    let { input, data = $bindable() } = $props();
    let [key, schema]: [string, z.ZodTypeAny] = input;

    let placeholder = uppercaseFirstLetter(key)

</script>

{#if schema instanceof ZodString}
    <input type="text" {placeholder} bind:value={data[key]}/>
{:else if schema instanceof ZodBoolean}
    <input type="checkbox"  placeholder={key}/>
{:else if schema instanceof ZodNumber}
    <input type="number"  placeholder={key}/>
{:else if schema instanceof ZodEnum}
    <select>
        {#each schema.options as option}
            <option value="" placeholder={key}></option>
        {/each}
    </select>
{/if}
