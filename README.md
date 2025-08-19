# ZxForm
### Literally, Zod x Forms

A simple tool for converting a zod schema to a form automatically. Simply pass in a schema, and receive an automatically validated form!

Here's a look at what's possible. Edit this example at the [playground](https://svelte.dev/playground/674a5be9ef2245ee87459420c009e42a?version=5.38.2#H4sIAAAAAAAACo1WXY7bNhC-ykR5WBmw7G2Rh9bxuk3TFHnoH7BpizbKAy2NbCYUKZDUer2Gz9AT9K2H6Hl6gV6hwx_J0q43iGHsmuT8fDPzzZCHRLIak0Xyx-13StdwvVW7ghlMpknFBZpk8faQ2H3jRNwG7UeFF00zMzcorNtbk8q5_UJJi9KSmWRpCs0bC4LJzVWeWJMnq1wC8LpR2sIB7uAIlVY15MmdKvPk-eA0ouuObytamSy48ZJOdj6HN1uESgmhdlxuAG9Z3QgEs1WtKN0_HxswIUBVYEfCrUETrWTwsjWWXFluKQdTaAQrcKtEiZpWJYZQuJK0YrIE1FppqNEYtkEDSgKXTWvP2wsqAyNOPmChEFFgTRnrNX_yIkw8YvH1mx--pyMf0hhXh905c9ZNu665hXVrrZInM6S4ZsWHj2JwWS15VaGmXXBsMC5_pm1ccbCM2BZRAUjF4q0dLBtmzE7pEtIiZsIZmQwkSq2aUu0kZVG2kNKfeni8VkogO-F-AdFQpZRFPSAAN0BfJrvqT6FCFEQdRLAKakWR7H1Wii1S4C5qjaYVHm_VysLXpFinJbNsQZL7CRzcGQDR2RCOmVCbNE88JUNaKQnECyefJ5PnD4XdUdg_Bqju0IIhCDWDK7gLKjO1fo-FTaM7ADrlYtEdexG_lR46ti2oH36m1BCtqTiogcENE7wMqnkCx4nLS6QLl-Gwo-rAbo2WnRy7z4BPzstvCMv1qqEW5AaX8_UKYK9a2Cl5QbQigjWsrrF8kifTgcetrYUvyA3BYWvqRmLrmKnD7nqcrt1nIO1QxSp_vXHhzgpVk_uT-HEyzXttN6AolzNjNTV8OplJJbFu7D6d9Cq1UuW9fBMT07d58po1zd7FlifXrAw_Xt0WnEofFt8o7X6-mzxIauhFh_a12gHT6BPnaEk4vnLa94KKvhz8UfGoy4KtzoUnwN2MIK5RU0Qbi-mzyUzFoZEG_TMzxGcyNuUjOenBU6s6UJ34Cdc1WqLboKOnIPgHHMl2zija0g2aT3Tm5gcligVnnRHid23G5YmDIR1mXWPFJabpzQSuVnAzhRGtB43zO5WhJviUxzgeHPW8lzAhlCy5Z-k9Vn20b_pqv-kNvTxvaNxjw32Ai4fgVKthyWBL8dEN-pRyY-xe4FVIV1ZioTQL7dpKohLRC5_TNXsOx3LOVhf3O2UY3L3A-qBexUvVTb_Y6n4Qjnh5b3S86KdxuGAoFncZh_mxZfbCQKOM4TQeoslvB9cjs6Esqjnd2uQ7ugqD4kff29SafCOhbcYzaDRLxkCLeP8taOCfUemOu9TQCF_OAzJ6vCxLfgOFIK5fOcqX_kWT22V8rRzCeD_6Z87ySZbBLzSljeRNg9a4JHBZiLbEUxNtkVHdgB4T4V6DLDtpH55G3SiWTo4Bl2vFeBIfXCShfYyHedQ5dqZOVoKL3soomkrgLbwnUHRZZmu0O0QZH2xetuklS6Y_LDz_Nprts88uL_3ln5kaaps9Iy-SFljzNY23eERlwOzLy8uBRYBfuaGMt8bVe8zyzlVPatKLfHIT31EZ_v3r7__--bPHN29Wp8F_3toJuMTWaiayZ4S99_GJUXxBOi5ZBMlzj7uvsVQgBytmdk6pXY3L4YgUeOKIFAXol-9oT6MZMcpNrtzmln6WNDIX8DnW7rUb9DtZemg7RMnC6haP72hFdyE9astkUTFh8Pg_z-qXZuYLAAA=):
<p align="center">
  <img width="400" alt="image" src="https://github.com/user-attachments/assets/bd4526c3-7833-4bd1-b737-fb282b3044b0" />
  &nbsp;&nbsp;&nbsp;&nbsp;
  <img width="400" alt="image" src="https://github.com/user-attachments/assets/bf657cb5-dd03-4559-ade9-c81e4ec3db2c" />
</p>

# Limitations
This is a side project, and somewhat broken right now.
Only svelte is supported for now.

# Documentation

I'm just beginning to write this, so I'm sorry if it's incomplete. Please feel free to create an issue and ask me for any feature request, or create a pull request yourself.


### Getting Started
This example will be assuming you're starting a new project from scratch. If you already have a project, make sure you have the dependencies installed, and skip to installing the package with npm.

Run the following to set up a project
```bash
npx sv create # Select the options you want in your new project
npm i zod zxforms-svelte
```

Simply create a zod schema.
Each input you want should be a subobject, for now either a string, number, boolean, or enum. Enums appear as dropdown single select, and booleans as checkboxes.
```ts
z.object({
  input: z.string()
})
```

### Meta
Include meta information for more customization. You can include the following on an input:
- default - for a default value
- type - for a custom input type (like 'password')
- title
- description

On the main form, you can also include the following:
- title
- description
- callback - a function that receives the form data. If callback is set, the form will have event.preventDefault() called, so the default form submission will not occur

# Example
Here's an example which attempts to show off all features. This example creates the forms shown at the top of this README

```svelte
<script>
import { z } from "zod";
import ZxForm from "zxforms-svelte"

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
    })
    .meta({
      title: "Example Form", // Form title
      description: "An example form to show you what's possible", // Description at the top of the form
      submitName: "Sign up", // Custom submit button title
      callback: cb, // Custom submit callback
    });
</script>

<!-- Then, pass the schema object to the ZxForm element -->
<!-- You can also include action and method attributes, as if it was an html form element -->
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

      <a href="#" class="dark:text-neutral-400 underline text-sm mt-4 font-semibold text-stone-800 flex">Sign in instead</a>
    </div>
  {/snippet}
</ZxForm>
```

