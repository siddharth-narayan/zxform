<script lang="ts">
  import { z } from "zod";
  import ZxForm from "$lib/ZxForm.svelte";
  import ThemeSwitcher from "$lib/components/large/ThemeSwitcher.svelte";
  import { ModeWatcher } from "mode-watcher";
  import SignatureBox from "$lib/components/large/SignatureBox.svelte";

  // The following example should showcase all of the following uses
  // - Custom titles, placeholders, descriptions, and error messages on inputs
  // - Custom title, and description on the form element
  // - Optional inputs
  // - Custom HTML in all descriptions, titles, and the submit button
  // - Callback on the form element
  // - The different types of supported inputs:
  //   - text
  //   - password (custom types)
  //   - dropdown menu (enum)
  //   - boolean
  // - A custom footer

  // This is an example, feel free to modify and check the result
  function cb(data: any) {
    console.log("Form submitted, data:");
    console.log(data);
  }

  const schema = z
    .object({
      email: z
        .email({ message: "Please enter a valid email" }) // Custom invalid messages
        .meta({
          description: "We <b>promise</b>  you won't be spammed!", // Custom html is available in descriptions, placeholders and the submit button
          placeholder: "example@gmail.com",
        }),

      name: z.string().nonempty(),
      mood: z
        .enum(["Happy", "Sad", "Excited", "Bored"])
        .meta({ title: "How are you feeling?", placeholder: "Happy" }), // Custom input title
      age: z.number().gte(4).optional(), // Optional inputs
      password: z.string().nonempty().meta({ type: "password" }), // Set a custom type, like "password"
      feedback: z.string().nonempty().meta({ type: "textarea" }),
      terms: z
        .boolean()
        .refine((v) => v, {
          message: "You must agree to the terms and conditions",
        })
        .meta({
          title: "Terms and Conditions",
          description:
            'You must agree to our <a href="#" style="text-decoration: underline;">Terms and Conditions</a>',
        }),
      signature: z.any().meta({custom: SignatureBox}),
    })
    .meta({
      title: "Example Form", // Form title
      description: "An example form to show you what's possible", // Description at the top of the form
      submitName: "Sign up", // Custom submit button title
      callback: cb, // Custom submit callback
    });
</script>

<ModeWatcher />
<ThemeSwitcher />

<ZxForm {schema}>
  <!-- Use snippets to include a custom header or footer -->
  <!-- {#snippet header()}
    // Snippet content here
  {/snippet} -->
  {#snippet footer()}
    <div class="flex justify-between">
      <p class="dark:text-gray-100 text-sm mt-4 font-semibold text-stone-900">
        Visit us at <a href="#" class="underline">example.com</a> ❤️
      </p>

      <a
        href="#"
        class="dark:text-neutral-400 underline text-sm mt-4 font-semibold text-stone-800 flex"
        >Sign in instead</a
      >
    </div>
  {/snippet}
</ZxForm>
