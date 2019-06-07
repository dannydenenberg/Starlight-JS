/** NOTE: Edit the actions object to add or change response functions **/
// this is the keyword to function list that goes hand in hand with the utterances variable
const actions = {
  "hello": (text) => say('hello'),
}


// talks to the user
export function say(text) {
  var msg = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(msg);
}

export default actions;