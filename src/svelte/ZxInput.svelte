<script lang="ts">
    import { uppercaseFirstLetter } from "@/lib/misc";
    import { css } from "@emotion/css";
    import { z, ZodBoolean, ZodEnum, ZodNumber, ZodString } from "zod";

    let defaultStyle = {
        label: css({
            display: "flex",
            flexDirection: "column",
            gap: ".25em",
        }),
        input: css({}),
    };

    let { input, data = $bindable(), styles = defaultStyle } = $props();
    let [key, schema]: [string, z.ZodTypeAny] = input;

    let placeholder = uppercaseFirstLetter(key);
    let edited = $state(false);

    function onchange() {
        edited = true;

        let validate = schema.safeParse(data[key]);
        console.log(validate);
        if (!validate.success) {
            console.log(validate.error);

            styles = {
                label: styles.label,
                input: css({
                    borderColor: "red",
                }),
            };
        } else {
            styles = {
                label: styles.label,
                input: css({}),
            };
        }
    }
</script>

<div>
    <label class={styles.label}
        >{placeholder + ":"}

        {#if schema instanceof ZodString}
            <input
                type="text"
                {onchange}
                {placeholder}
                class={styles.input}
                bind:value={data[key]}
            />
        {:else if schema instanceof ZodBoolean}
            <input
                type="checkbox"
                {onchange}
                {placeholder}
                class={styles.input}
                bind:value={data[key]}
            />
        {:else if schema instanceof ZodNumber}
            <input
                type="number"
                {onchange}
                {placeholder}
                class={styles.input}
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
</div>
