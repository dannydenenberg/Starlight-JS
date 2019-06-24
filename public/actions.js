/** NOTE: Edit the actions object to add or change response functions
 *  THIS IS THE FILE DEVELOPERS SHOULD BE EDITING
 **/

import { getSpeechToText } from "./index.js";

// talks to the user
export function say(text) {
  var msg = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(msg);
}

/**
 * Here is the meat of this file. Edit this to associate a command present in what the person said with a function to execute that takes the user's command as an argument.
 */
const actions = {
  "hello|hey": text => {
    say("hey dude!");
  },
  "google search": googleSearch,
  "youtube play": youtubePlay,
  "youtube search": youtubeSearch,
  email: emailF
};

function emailF(text) {
  (async () => {
    say("what email address?");
    let recipient = await getSpeechToText();
    console.log(`Recipient: ${recipient}`);
    const rawResponse = await fetch("/mail", {
      method: "post",
      body: {
        recipient
      },
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ speechToText: "the text content" })
    });
    const content = await rawResponse.json();

    console.log(content);
  })();
}

/**
 * Here are most of the functions used in the actions variable.
 */
function googleSearch(text) {
  console.log(`text: ${text}`);
  window.open(
    `https://www.google.com/search?q=${text
      .substr(text.search("search") + "search".length + 1)
      .split(" ")
      .join("+")}`
  );
}

/**
 * This function pairs with the app.ts file in which there is an app.post('/youtubeplay') call.
 * Works.
 */
async function youtubePlay(text) {
  const link = `https://www.youtube.com/results?q=${text
    .substr(text.search("youtube play") + "youtube play".length + 1)
    .split(" ")
    .join("+")}`;
  console.log(link);

  const result = await fetch(`/youtubeplay?url=${link}`, {
    method: "post"
  });

  // waits for response from backend
  const json = await result.json();

  // play the youtube video
  window.open(json.firstURL);
}

function youtubeSearch(text) {
  const link = `https://www.youtube.com/results?q=${text
    .substr(text.search("youtube search") + "youtube search".length + 1)
    .split(" ")
    .join("+")}`;
  window.open(link);
}

export default actions;
