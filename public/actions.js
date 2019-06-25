/** NOTE: Edit the actions object to add or change response functions
 *  THIS IS THE FILE DEVELOPERS SHOULD BE EDITING
 **/

/**
 * NOTE: When using getSpeechToText() MAKE SURE TO USE `AWAIT`.
 */
import { getSpeechToText } from "./index.js";

// talks to the user. use in conjunction with `AWAIT` when possible
export async function say(text) {
  // for sleeping syncronously (with `await`).
  // See below for usage
  function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  var msg = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(msg);

  // sleep a custom amount dependent on how long the text is to make it so that the speech recognizer doesn't recognize the say function's audio
  // TODO: TWEAK THIS CONSTANTLY
  await timeout(120 * text.length);
  // await timeout(3000);
  console.log("done");
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
  email: email,
  "search the coaching blog for": gallupSearch
};

function gallupSearch(text) {
  (async () => {
    let rest = text.substr(
      text.search("coaching blog for") + "coaching blog for".length + 1 // plus 1 for the extra space
    );
    const rawResponse = await fetch(
      `http://coaching-search.herokuapp.com/search?q=${rest}`,
      {
        method: "get",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    );
    const res = await rawResponse.json();
    window.open(res.data[0]);
  })();
}

function email(text) {
  (async () => {
    await say("What email address?");
    let recipient = await getSpeechToText();

    // format's like an email.
    recipient = recipient
      .split(" ")
      .map(s => {
        if (s == "dot") {
          return ".";
        } else if (s == "at") {
          return "@";
        } else if (s == "underscore") {
          return "_";
        } else {
          return s;
        }
      })
      .join("");

    console.log(`Recipient: ${recipient}`);

    await say("What would you like to say?");
    let emailBody = await getSpeechToText();
    console.log(`EmailBody: ${emailBody}`);

    const rawResponse = await fetch("/mail", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ recipient, emailBody })
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
