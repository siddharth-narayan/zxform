<script lang="ts">
import { Schema, z, ZodObject, ZodTypeAny } from "zod"
import ZxInput from "./ZxInput.svelte";

let { schema, styles } = $props()
let data: z.infer<typeof schema> = $state();

function buildForm<T extends ZodTypeAny>(s: T, style?: any) {
    if (s instanceof ZodObject) {
        for (const [key, value] of Object.entries(s.shape)) {
            data = value
        }
    }
}

function onsubmit() {

}

</script>

<form {onsubmit}>
    {#each  Object.entries(schema.shape) as input}
    <ZxInput {input} bind:value={data}></ZxInput>
    {/each}
</form>
