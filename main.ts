import { mount } from 'svelte';
import { z } from "zod";

import ZxForm from '@/svelte/ZxForm.svelte';

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  age: z.number().lte(6),
  password: z.string().min(8),
  isCool: z.boolean().refine(val => val),
})

const app = mount(ZxForm, { props: { schema }, target: document.getElementById("app")! });

export default app;

// import { z } from "zod";
// const schema = z.object({
//   name: z.string(),
//   email: z.string().email(),
//   age: z.number().lte(6),
//   password: z.string().min(8),
//   isCool: z.boolean().refine(val => val),
// })


// const app = mount(Test, { props: { schema }, target: document.getElementById("app")! });