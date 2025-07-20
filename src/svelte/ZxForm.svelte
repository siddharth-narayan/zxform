<script lang="ts">
  import "./app.css";

  import ZxInput from "./ZxInput.svelte";
  import { type FormProps } from "@/lib/types";

  import * as Card from "@/lib/components/ui/card/index.js";
  import { ModeWatcher } from "mode-watcher";
  import ThemeSwitcher from "@/lib/components/large/ThemeSwitcher.svelte";
  import { Button } from "@/lib/components/ui/button";

  let { schema, action = "", method = "GET"}: FormProps = $props();

  let meta = schema.meta()
  let data: any = $state({});

  function onsubmit(event: SubmitEvent) {
    console.log(data);
    if (meta?.preventDefault || meta?.callback) {
      event.preventDefault();
    }

    let result = schema.safeParse(data)
    console.log(result)
    if (!result.success) {
      // TODO: Add in validate() on the inputs so that they turn red
      return 
    }

    if (typeof meta?.callback === "function") {
      meta.callback(result.data);
    }
  }
</script>

<ModeWatcher />
<ThemeSwitcher />

<Card.Root class="mx-auto w-full max-w-sm">
  <Card.Header>
    <Card.Title class="text-2xl">{meta?.title ?? "Form"}</Card.Title>
    <Card.Description>{meta?.description ?? ""}</Card.Description>
  </Card.Header>
  <Card.Content>
    <form novalidate {onsubmit} class="grid gap-4" {action} {method}>
      {#each Object.entries(schema.shape) as input}
        <ZxInput {input} bind:data></ZxInput>
      {/each}

      <Button type="submit" class="w-full">Submit</Button>
    </form>
  </Card.Content>
</Card.Root>
