import { mount } from 'svelte';
import { z } from "zod";
import ZxForm from '@/svelte/ZxForm.svelte';
import { uppercaseFirstLetter } from '@/lib/misc';
const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  age: z.number().lte(6),
  password: z.string().min(8)
})

const app = mount(ZxForm, { props: { schema }, target: document.getElementById("app")! });

export default app;