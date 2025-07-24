<script lang="ts">
    import { onMount } from "svelte";
    import { Asterisk } from "@lucide/svelte";
    import { v4 as uuidv4 } from "uuid";
    import {
        z,
        ZodBoolean,
        ZodEnum,
        ZodNumber,
        ZodOptional,
        ZodString,
    } from "zod";

    import Input from "$lib/components/ui/input/input.svelte";
    import  Label from "$lib/components/ui/label/label.svelte";
    import Checkbox from "./components/ui/checkbox/checkbox.svelte";
    import * as Select from "./components/ui/select/index.js";

    import { skipFirstSubscribe, uppercaseFirstLetter } from "./misc.js";
    import { type InputProps } from "./types.js";
    import { validate_callback } from "./validate-store.js";

    let { input, data = $bindable() }: InputProps = $props();
    let [key, schema] = input;

    // Get options
    let id = uuidv4(); // TODO: Change this eventually
    let meta = schema.meta();
    let optional = schema instanceof ZodOptional;
    let placeholder =
        (meta?.placeholder as string) ?? uppercaseFirstLetter(key);
    let title = meta?.title ?? placeholder;
    let description = meta?.description;

    let type = $state("text");
    data[key] = meta?.default;

    if (schema instanceof ZodString) {
    } else if (schema instanceof ZodNumber) {
        type = "number";
    } else if (schema instanceof ZodBoolean) {
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
            `id-${id}`,
        ) as HTMLInputElement;

        if (!element) {
            console.log(id);
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
        >{title}
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
        <p class="text-muted-foreground text-sm">{description}</p>
    {/if}
</div>
