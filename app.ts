/**
This is the entry point of the application. Express happens here.
**/
import nodemailer from "nodemailer";
import emailPassword from "./passwords";
import puppeteer from "puppeteer";
import express from "express";
const app = express();
const port = process.env.PORT || 3000;

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

/*----------------------------------------------------------------------------------- */
/**
 * NOTE: DO NOT EDIT BELOW!!!!!!!!!!!!
 * For the getSpeechToText() function in public/index.js
 */
// for getting speech to text
// when this value changes, it means that the mostRecentSaid.text value has changed
// this value is changed below in the setter of the mostRecentSaid object
let textChange = false;

var mostRecentSaid = {
  txt: "",
  set text(t) {
    textChange = !textChange;
    // console.log(`TO [${textChange}]`);
    this.txt = t;
  },
  get text() {
    return this.txt;
  }
};

app.post("/mostrecentsaid", (req, res) => {
  // console.log("inside most recent said");
  let temp = textChange;

  (async function check() {
    if (temp == textChange) {
      await new Promise(done => setTimeout(() => done(), 100)); // pause for 100 miliseconds to prevent stack overflow
      check();
    } else {
      // console.log("<<DONE!!>>");
      res.json({ text: mostRecentSaid.text });
    }
  })(); // make sure to actually run the function
});

app.post("/storespeech", (req, res) => {
  mostRecentSaid.text = req.body.text;
  console.log(`[Store Speech]: ${req.body.text}`);
  res.send("Got it.");
});
/**
 * END for getSpeechToText() in public/index.js
 */
/*----------------------------------------------------------------------------------- */

/**
 * This is paired with the `email` key in the public/actions.js object
 */
app.post("/mail", (req, res) => {
  let info = req.body;

  const username = "starlitehelp@gmail.com";
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: username,
      pass: emailPassword
    }
  });

  let mailOptions = {
    from: username,
    to: info.recipient,
    subject: "Hola, Shalom",
    text: info.emailBody
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  res.json({ message: "good to go" });
});

/**
 * Add any answers to post/get/etc requests from the client side here
 */

// USE PUPPETEER TO RESPOND TO A POST WITH THE LINK TO YOUTUBE VIDEOS TO SCRAPE
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
      const firstURL = document.querySelector<HTMLAnchorElement>(
        "#dismissable #thumbnail"
      )!.href; // this works.

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
