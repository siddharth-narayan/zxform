<script lang="ts">
    import { z, ZodTypeAny } from "zod";
    import ZxInput from "./ZxInput.svelte";
    import { css, keyframes } from "@emotion/css";

    let defaultStyles = css({
        display: "flex",
        flexDirection: "column",
        gap: "1em",
    });

    let defaultOptions = {
        errorOnMoveOut: true,
        title: "Form",
    };

    let { schema, styles, options}: {schema: ZodTypeAny, styles: {form: string, input: string}, options: {}} = $props();

    let data: any = $state({});

    function onsubmit(event) {
        event.preventDefault();

        console.log("Foram submission!");
        console.log($state.snapshot(data));
    }
</script>

<form {onsubmit} class={styles}>
    <h3>{options.title}</h3>
    {#each Object.entries(schema.shape) as input}
        <ZxInput {input} bind:data></ZxInput>
    {/each}
    <input type="submit" value="Submit" />
</form>
