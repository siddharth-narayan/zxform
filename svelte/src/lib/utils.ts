import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	let classes =  twMerge(clsx(inputs));
	let prefixed = classes.split(" ").map(s => {
      if (!s || s.startsWith("zxforms:")) return s;
      return `zxforms:${s}`;
    }).join(" ")

	console.log(`normal: ${classes}`)
	console.log(`prefixed: ${prefixed}`)
	return prefixed
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, "children"> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };