<script lang="ts">
  import { z } from "zod";
  import ZxForm from "$lib/ZxForm.svelte";
  import ThemeSwitcher from "$lib/components/large/ThemeSwitcher.svelte";
  import { ModeWatcher } from "mode-watcher";

  // This is an example, feel free to modify and check the result
  function cb(data: any) {
    console.log("Form submitted, data:");
    console.log(data);
  }
  
  const schema = z.object({
    email: z.email(),
    name: z.string()
    age: z.number().gte(4).optional(),
    password: z.string().meta({ type: "password" }),
  });
</script>

<ModeWatcher />
<ThemeSwitcher />

<ZxForm {schema}>
  {#snippet footer()}
    <p class="dark:text-gray-100 text-sm mt-4 font-semibold text-stone-900">
      Visit us at <a href="https://example.com" class="underline">example.com</a
      >
    </p>
  {/snippet}
</ZxForm>
