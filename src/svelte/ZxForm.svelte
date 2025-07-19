<script lang="ts">
  import "./app.css";

  import { z } from "zod";
  import ZxInput from "./ZxInput.svelte";
  import { type FormProps } from "@/lib/types";
  import { defaultOptions } from "@/lib/defaults";

  import * as Card from "@/lib/components/ui/card/index.js";
  import { ModeWatcher } from "mode-watcher";
  import ThemeSwitcher from "@/lib/components/large/ThemeSwitcher.svelte";
  import Label from "@/lib/components/ui/label/label.svelte";
  import { Input } from "@/lib/components/ui/input";
  import { Button } from "@/lib/components/ui/button";
  let { schema, options }: FormProps = $props();

  let form_options = { ...defaultOptions, ...options };

  let data: any = $state({});

  let id = "11";
  function onsubmit(event: SubmitEvent) {
    event.preventDefault();

    console.log("Form submission!");
    console.log($state.snapshot(data));

    console.log(schema.parse(data));
  }
</script>

<ModeWatcher />
<ThemeSwitcher />

<Card.Root class="mx-auto w-full max-w-sm">
  <Card.Header>
    <Card.Title class="text-2xl">{form_options.title}</Card.Title>
    <Card.Description>{form_options.description}</Card.Description>
  </Card.Header>
  <Card.Content>
    <form {onsubmit} class="grid gap-4">
      {#each Object.entries(schema.shape) as input}
        <ZxInput {input} bind:data></ZxInput>
      {/each}

      <Button type="submit" class="w-full">Submit</Button>
    </form>
  </Card.Content>
</Card.Root>
