import { browser } from "webextension-polyfill-ts";

console.log("Added event listener");
window.addEventListener("load", () => {
  console.log("Start appending");
  const script = document.createElement("script");
  script.src = browser.runtime.getURL("js/runtime.bundle.js");
  (document.head || document.documentElement).appendChild(script);
  console.log("Appended", script);
});

export {};
