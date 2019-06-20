import actions, { say } from "./actions.js";
import { triggerWord } from "./imports.js";
// returns the function that needs to be executed because of a given statement
function getAction(text) {
  // for in goes through the keys in the object
  // go through the keys of the actions object and check if

  // get the part of the text after `starlite`. just the command.
  const restOfTextAfterKeyword = text.substr(
    text.search(triggerWord) + triggerWord.length
  ); // works

  // go through keys of actions and find one that is in the command. return the associated function
  for (let action in actions) {
    // go through all different command options in the keys
    for (let command of action.split("|")) {
      if (restOfTextAfterKeyword.includes(command)) {
        return actions[action]; // return the function
      }
    }
  }

  // otherwise, if no command was found that matched it.
  return text => {
    say("dude, what up?");
  };
}

export default getAction;
