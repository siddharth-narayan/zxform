import { clsx, type ClassValue } from "clsx"
import { useEffect } from "react"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

let callbacks: (() => any)[] = []

function validateSignalSubscribe(cb: () => any) {
  callbacks.push(cb)
}

function validateSignalUnsubscribe(cb: () => any) {
  const index = callbacks.indexOf(cb);
  if (index !== -1) {
    callbacks.splice(index, 1);
  }
}

export function useValidationCallback(cb: () => any) {
  useEffect(() => {
    validateSignalSubscribe(cb);
    return () => validateSignalUnsubscribe(cb);
  }, []);
}

export function sendValidateSignal() {
  console.log(callbacks.length)
  callbacks.forEach(cb => {
    cb()
  })
}

