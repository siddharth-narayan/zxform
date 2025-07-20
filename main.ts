import { mount } from 'svelte';
import { z } from "zod";

import ZxForm from '@/svelte/ZxForm.svelte';

const schema = z.object({
  name: z.string(),

  email: z.email().meta({description: "You will NOT be spammed!"}),

  age: z.number()
    .gte(21, { error: "Not even old enough to drink?"}),

  password: z.string().min(8).max(25)
  .refine((p) => {
    return (p.includes(" ") || p.includes("\\") || p.includes("!") || p.includes("#"))
  }, { error: "Include a space, backslash, exclamation, or hastag please"}),

  isCool: z.boolean().refine(val => val, { error: "You can't be uncool, sorry :("}).meta({title: "Are you cool?"}),

}).meta({title: "Example Form", description: "A simple form to show you what's possible"})

const app = mount(ZxForm, { props: { schema }, target: document.getElementById("app")! });

export default app;