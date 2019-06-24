import getAction from "./getAction.js";
import { triggerWord } from "./imports.js";

/** LEAVE THESE AT THE TOP. THEY ARE NEEDED FOR USE IN EARLY CODE **/
const SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
const SpeechGrammarList = webkitSpeechGrammarList || SpeechGrammarList;
const SpeechRecognitionEvent =
  webkitSpeechRecognitionEvent || SpeechRecognitionEvent;

var continueRecognition = true; // for when the chrome extention can allow the user to diable audio input

let recognition = new SpeechRecognition();
recognition.lang = "en-US";

// start the listening
recognition.start();

// when the listening stops because of lack of sound for some period of time
recognition.onresult = async function(event) {
  // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
  // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
  // It has a getter so it can be accessed like an array
  // The [last] returns the SpeechRecognitionResult at the last position.
  // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
  // These also have getters so they can be accessed like arrays.
  // The [0] returns the SpeechRecognitionAlternative at position 0.
  // We then return the transcript property of the SpeechRecognitionAlternative object

  // obtain the transcript of what was said
  var last = event.results.length - 1;
  const text = event.results[last][0].transcript;
  console.log(text);

  // send the text to be stored in a variable in the app.ts file that keeps track of the most recent text said
  fetch("/storespeech", {
    method: "post",
    body: JSON.stringify({
      text
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  // if the string contained the word `starlite` (triggerWord), then send the command to the server (node js) for processing.
  // Otherwise, listen again ( the loop starts over )
  // note, the `includes` string function is ES6
  if (text.toLowerCase().includes(triggerWord)) {
    // acquire and run the action. Note that `getAction(string)` returns a function
    getAction(text.toLowerCase())(text.toLowerCase());
  }
};

// when the speech recognizer stops listening for audio, restart it if the continueRecognition is true
recognition.onend = () => {
  if (continueRecognition) {
    recognition.start();
  }
};

/**
 * This function works with 2 server responses in app.ts.
 * NOTE: This function must be used inside of an async function with an await infront of it.
 */
export async function getSpeechToText() {
  let res = await fetch("/mostrecentsaid", {
    method: "post",
    // body: JSON.stringify({
    //   text
    // }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  // get the resulting json
  let resJSON = await res.json();

  // get the speech that the person said

  return resJSON.text;
}
