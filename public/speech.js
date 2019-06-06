var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var continueRecognition = true; // for when the chrome extention can allow the user to diable audio input

// like the `hey google` or `alexa`. Just note that it has to be spelled this way, not `starlite`
const triggerWord = 'starlight';

var recognition = new SpeechRecognition();
recognition.lang = 'en-US';


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


  // if the string contained the word `starlite` (triggerWord), then send the command to the server (node js) for processing.
  // Otherwise, listen again ( the loop starts over )
  // note, the `includes` string function is ES6
  if (text.toLowerCase().includes(triggerWord)) {
    sendTextToNodeJS(text);
  }
}

// when the speech recognizer stops listening for audio, restart it if the continueRecognition is true
recognition.onend = () => {
  if (continueRecognition) {
    recognition.start();
  }
}


// NOTE: the URL in the fetch will need to be changed when it is ported to the web
const url = 'http://localhost:3000/submitCommand';
async function sendTextToNodeJS(text) {
  // the `/submitCommand` is handled in the app.js/app.ts file under a post request
  const result = await fetch(url, {
    method: 'post',
    body: JSON.stringify({
      text
    }),
    headers: {
      'Content-Type': 'application/json'
    },
  });

  // waits for response from backend 
  const json = await result.json();
  console.log(json.response);
}

// talks to the user
function say(text) {
  var msg = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(msg);
}