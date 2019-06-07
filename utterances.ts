import fs from 'fs';

// // this map contains the phrase or keyword that maps to a value which represents a function in the actions object
// const utterances = new Map([
//   ["hey", "hello"],
//   ["hello", "hello"],
//   [""]
// ])


class Utterances {
  utterances = new Map<string, string>();

  constructor() {
    fs.readFile(__dirname + "/utterances.list", 'utf-8', (err, data) => {
      if (err) {
        console.log("ERROR: ", err);
      }
      console.log(data);
    });
  }
}


// this map contains the phrase or keyword that maps to a value which represents a function in the actions object

/** get the info from the utterances.list file to populate the `utterances` variable **/




export default Utterances;
