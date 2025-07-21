import { mount } from 'svelte';
import { z } from "zod";

import ZxForm from '@/svelte/ZxForm.svelte';

function cb(data: any) {
  console.log("Form submitted, data:")
  console.log(data)
}

const schema = z.object({
  name: z.string(),

  email: z.email().meta({description: "You will NOT be spammed!"}),
  address: z.string().optional(),
  mood: z.enum(["Happy", "Sad", "Bored", "Excited"]),
  age: z.number()
    .gte(21, { error: "Not even old enough to drink?"}),

  password: z.string().min(8).max(25)
  .refine((p) => {
    return (p.includes(" ") || p.includes("\\") || p.includes("!") || p.includes("#"))
  }, { error: "Include a space, backslash, exclamation, or hastag please"}).meta({type: "password"}),

  isCool: z.boolean().refine(val => val, { error: "You can't be uncool, sorry :("}).meta({title: "Are you cool?"}),

}).meta({title: "Example Form", description: "A simple form to show you what's possible", callback: cb})

const app = mount(ZxForm, { props: { schema }, target: document.getElementById("app")! });

export default app;