# ZxForm
### Literally, Zod x Forms

A simple tool for converting a zod schema to a form automatically. Simply pass in a schema, and receive an automatically validated form!

Here's a look at what's possible
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

