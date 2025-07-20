<script lang="ts">
  import "./app.css";

  import ZxInput from "./ZxInput.svelte";
  import { type FormProps } from "@/lib/types";

  import * as Card from "@/lib/components/ui/card/index.js";
  import { ModeWatcher } from "mode-watcher";
  import ThemeSwitcher from "@/lib/components/large/ThemeSwitcher.svelte";
  import { Button } from "@/lib/components/ui/button";

  let { schema }: FormProps = $props();

  let data: any = $state({});

  function onsubmit(event: SubmitEvent) {
    console.log(data)
    event.preventDefault();

    console.log(schema.safeParse(data));
  }
</script>

<ModeWatcher />
<ThemeSwitcher />

<Card.Root class="mx-auto w-full max-w-sm">
  <Card.Header>
    <Card.Title class="text-2xl">{schema.meta()?.title ?? "Form"}</Card.Title>
    <Card.Description>{schema.meta()?.description ?? ""}</Card.Description>
  </Card.Header>
  <Card.Content>
    <form novalidate {onsubmit} class="grid gap-4">
      {#each Object.entries(schema.shape) as input}
        <ZxInput {input} bind:data></ZxInput>
      {/each}

      <Button type="submit" class="w-full">Submit</Button>
    </form>
  </Card.Content>
</Card.Root>
