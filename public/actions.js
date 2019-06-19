/** NOTE: Edit the actions object to add or change response functions
 *  THIS IS THE FILE DEVELOPERS SHOULD BE EDITING
 **/
const actions = {
  "hello|hey": text => say("hello"),
  "google search": googleSearch,
  "youtube play": youtubePlay,
  "youtube search": youtubeSearch,
  email: email
};

function email(text) {
  (async () => {
    const rawResponse = await fetch("/mail", {
      method: "POST",
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

// talks to the user
export function say(text) {
  var msg = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(msg);
}

export default actions;
