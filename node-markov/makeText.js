/** Command-line tool to generate Markov text. */

const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");
const { CLIENT_RENEG_LIMIT } = require("tls");

// creates the text using the class we defined and the data from the txt we inserted and stores it in a varaible
function createText(text) {
  let mm = new markov.MarkovMachine(text);
  console.log(mm.makeText());
}

// reades the file that we insert into the command line ex: eggs.txt then inserts that text into the create text function above

function makeText(path) {
  fs.readFile(path, "utf8", function cb(err, data) {
    if (err) {
      console.error(`Cannot read file: ${path}: ${err}`);
      process.exit(1);
    } else {
      createText(data);
    }
  });
}

// same concept, but uses a url instead
async function makeURLText(url) {
  let resp;

  try {
    resp = await axios.get(url);
  } catch (err) {
    console.error(`Cannot read URL: ${url}: ${err}`);
    process.exit(1);
  }
  createText(resp.data);
}

// creates a list with the method (file or url) and path (where this url or file is located). We slice the first 2 argvs since they are related to local files

let [method, path] = process.argv.slice(2);
console.log([method, path]);

// if method is a file, we pass the path to that file  through the file text function, if its a url, we use the url function. If it is neither, we return an error

if (method === "file") {
  makeText(path);
} else if (method === "url") {
  makeURLText(path);
} else {
  console.error(`Unknown method: ${method}`);
  process.exit(1);
}
