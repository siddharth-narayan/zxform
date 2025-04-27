<script lang="ts">
    import { z, ZodBoolean, ZodEnum, ZodNumber, ZodString } from "zod";

    let { input, data = $bindable() } = $props();
    let [key, schema] = input;

    let value: z.infer<typeof schema> = schema._def.defaultValue()
</script>

{#if input.schema instanceof ZodString}
    <input type="text" />
{:else if input.schema instanceof ZodBoolean}
    <input type="checkbox" />
{:else if input.schema instanceof ZodNumber}
    <input type="number" />
{:else if input.schema instanceof ZodEnum}
    <select>
        {#each input.schema.value as option}
            <option value=""></option>
        {/each}
    </select>
{/if}
