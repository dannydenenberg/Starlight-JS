/**
 * Depricated function, everything is on client side now.
 */
// NOTE: the URL in the fetch will need to be changed when it is ported to the web
const url = "http://localhost:3000/submitCommand";
async function sendTextToNodeJS(text) {
  // the `/submitCommand` is handled in the app.js/app.ts file under a post request
  const result = await fetch(url, {
    method: "post",
    body: JSON.stringify({
      text
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });

  // waits for response from backend
  const json = await result.json();
  console.log(json);
}
