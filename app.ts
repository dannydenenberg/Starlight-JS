/**
This is the entry point of the application. Express happens here.
**/
import express from "express";
const app = express();
const port = 3000;

import nodemailer from "nodemailer";
import emailPassword from "./passwords.js";

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

app.post("/mail", (req, res) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "starlitehelp@gmail.com",
      pass: emailPassword
    }
  });

  let mailOptions = {
    from: "youremail@gmail.com",
    to: "myfriend@yahoo.com",
    subject: "Sending Email using Node.js",
    text: "That was easy!"
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});

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
