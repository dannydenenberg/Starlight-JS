import fs from "fs";

// // this map contains the phrase or keyword that maps to a value which represents a function in the actions object

class Utterances {
  // this map contains the phrase or keyword that maps to a value which represents a function in the actions object
  utterances = new Map<string, string>();

  /** Populate the utterances map with the key/value pairs in the utterances.list file **/
  constructor() {
    // syncronous reading. NOT OPTIMAL
    const data = fs.readFileSync(__dirname + "/utterances.list", "utf-8");
    console.log("IN utterances: \n", data); // works

    let lines = data.split("\n");

    for (let line of lines) {
      let first: string = line.split("=")[0];
      let second: string = line.split("=")[1];
      this.utterances.set(first, second);
    }
  }
}


// this map contains the phrase or keyword that maps to a value which represents a function in the actions object

/** get the info from the utterances.list file to populate the `utterances` variable **/

export default Utterances;
