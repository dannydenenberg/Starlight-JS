// old getSpeechToText code.
export async function getSpeechToText() {
  // do stuff before the checking of the textChange variable
  let temp = textChange;

  // recursive, so that it is non-blocking
  (async function checkVariable() {
    if (temp == textChange) {
      // nothing has changed, user hasn't said anything yet.
      // check again
      await new Promise(done => setTimeout(() => done(), 100)); // pause for 100 miliseconds to prevent stack overflow
    } else {
      console.log("finished");
      console.log(`CONTENT: ${mostRecentSaid.text}`);
    }
  })();

  return mostRecentSaid.text;
}

function delay(n) {
  n = n || 2000;
  return new Promise(done => {
    setTimeout(() => {
      done();
    }, n);
  });
}

export async function getSpeechToText1() {}
