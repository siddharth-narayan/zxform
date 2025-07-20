# ZxForm
### Literally, Zod x Forms

A simple tool for converting a zod schema to a form automatically. Simply pass in a schema, and receive a form!

<p align="center">
<img width="400" alt="image" src="https://github.com/user-attachments/assets/03be38a5-c571-4794-9c60-9af657222ba0" />
&nbsp;&nbsp;&nbsp;&nbsp;
<img width="400" alt="image" src="https://github.com/user-attachments/assets/25b8e767-7a7a-4c49-a439-6a7f3494bc8a" />
</p>

# Limitations
This is a side project, and pretty broken right now.
Only svelte is supported, and form submission currently does not work

# Documentation

I'm just beginning to write this, so I'm sorry if it's incomplete. Please feel free to create an issue and ask me for any feature request, or create a pull request yourself.


### Getting Started
For now, since I haven't packaged anything, you might have to copy-paste the components into your code and install the required dependencies.


Simply create a zod schema.
Each input you want should be a subobject, for now either a string, number, or boolean. Enum support is planned as a dropdown menu
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

### Example
```svelte
<script>
import { z } from "zod";
import ZxForm from "./ZxForm.svelte"

const schema = z.object({
  name: z.string(),

  email: z.email().meta({description: "You will NOT be spammed!"}),

  age: z.number()
    .gte(21, { error: "Not even old enough to drink?"}),

  password: z.string().min(8).max(25).meta({type: "password", description: "Use a really strong password!"}),

  isCool: z.boolean().refine(val => val, { error: "You can't be uncool, sorry :("}).meta({title: "Are you cool?"}),

}).meta({title: "Example Form", description: "A simple form to show you what's possible"})
</script>

<!-- Then, pass the schema object to the ZxForm element -->
<!-- You can also include action and method attributes, as if it was an html form element -->
<ZxForm {schema} />
```

Which gives you
<p align="center">
<img width="400" alt="image" src="https://github.com/user-attachments/assets/d95e2727-d4e0-4c5b-83c3-aedbf83f8f7c" />
&nbsp;&nbsp;&nbsp;&nbsp;
<img width="400" alt="image" src="https://github.com/user-attachments/assets/7f156496-2218-489d-b9e8-a5b0870a522e" />
</p>

