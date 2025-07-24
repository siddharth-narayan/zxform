import { writable } from "svelte/store";

export function uppercaseFirstLetter(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1)
}

export function skipFirstSubscribe(store: Writable<any>, callback: Function) {
    let skip = true;
    return store.subscribe(value => {
      if (skip) {
        skip = false;
        return;
      }
      
      callback(value);
    });
}