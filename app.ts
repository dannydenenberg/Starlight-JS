/**
This is the entry point of the application. Express happens here.
**/
import express from "express";
const app = express();
const port = 3000;

import puppeteer from "puppeteer";

// formats the body of the request into what we want (JSON)
import parser from "body-parser";
// response from server (node js) that means Starlite doesn't know how to respond
// this variable also appears in the speech.js file
const notACommand = "?notacommand?";

app.use(parser.json());
app.use(express.static(__dirname + "/../public")); // because it is run from inside the `build/` directory
console.log(`DIRNAME: ${__dirname}`);

app.get("/", (req, res) =>
  res.send(
    "This is root. You should probably not get this b/c I set up a public dir."
  )
);

/**
 * Add any answers to post/get/etc requests from the client side here
 */

// USE PUPETTER TO RESPOND TO A POST WITH THE LINK TO YOUTUBE VIDEOS TO SCRAPE
app.post("/youtubeplay", (req, res) => {
  (async () => {
    const url = req.query.url;

    console.log(`URL: ${url}`);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // Get the "viewport" of the page, as reported by the page.
    const doc = await page.evaluate(() => {
      // get url of first video
      const firstURL = document.querySelector("#dismissable #thumbnail").href; // this works.

      return {
        firstURL
      };
    });

    // console.log("FIRST URL: ", doc.firstURL);

    await browser.close();

    res.json(doc);
  })();
});

app.listen(port, () => console.log(`Starlite JS listening on port ${port}!`));
/***
IDEA:

the backend selects which function to use from the actions.js stuff and then sends the function back to the client for
execution.


**/
