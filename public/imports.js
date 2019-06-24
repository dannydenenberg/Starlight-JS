// like the `hey google` or `alexa`. Just note that it has to be spelled this way, not `starlite`
export const triggerWord = "starlight";

// this needs to be in index.js
async function getSpeechToText() {}

// in client side, use getters and setters. when the mostRecentSaid variable is set, take the text and finish the promise with speech to text

let obj = {
  v: 1,
  get b() {
    return this.v;
  },
  set b(value) {
    this.v = value;
  }
};
