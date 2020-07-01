"use strict";
const fs = require("fs");
const argv = require("yargs").argv;

const ADD = "add";
const REMOVE = "remove";
var dir = "./dist";

/***
 * Contents
 * writeFile
 * readFile
 * using yargs
 * -  node  index.js add --name='moataz' --age=30
 * -  node  index.js remove --name='moataz'
 */

/**
 * writeFile
 */
// fs.writeFile(dir+"file.txt", "writeFile 2 content here", function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("done");
//   }
// });

// const fileData = fs.writeFileSync(dir+"file.txt", "file content here");
/**
 * readFile
 */
// fs.readFile(dir+"file.txt", function (err, data) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("readFile");
//     // console.log(data);
//     console.log(data.toString());
//   }
// });

// const reader = fs.readFileSync(dir+"file.txt");
// console.log("readFileSync");
// console.log(reader.toString());

// // fs.writeFile(dir+"file.txt", "this is data from writeFile", function(err) {
// //   if (err) {
// //     console.log(err);
// //   } else {
// //     // console.log("done from writeFile");
// //   }
// // });

// // fs.readFile(dir+"file.txt", function(err , data) {
// //   console.log(data.toString());
// // });

// // fs.writeFileSync(dir+"file.txt", "this is data from writeFileSync");
// // var data = fs.readFileSync (dir+"file.txt");
// // console.log(data.toString());

// // console.log(pro[2]);

/**
 * Read arguments from terminal
 * we will not use `process.argv` but we will use `yargs`
 * https://www.npmjs.com/package/yargs
 * Usage
 * -    nodemon index.js --ships=4 --distance=22
 */

console.log("======> args");
console.log(argv);

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}
if (argv._[0] === ADD) {
  fs.readFile(dir + "/developers.json", function (err, data) {
    if (err) {
      fs.writeFile(
        dir + "/developers.json",
        JSON.stringify([{ [argv.name]: argv.age }]),
        function (err) {
          console.log(err);
        }
      );
    } else {
      const _data = JSON.parse(data);
      var filtered = _data.filter(function (el) {
        return !el[argv.name];
      });
      filtered.push({ [argv.name]: argv.age });
      fs.writeFileSync(dir + "/developers.json", JSON.stringify(filtered));
    }
  });
} else if (argv._[0] === REMOVE) {
  fs.readFile(dir + "/developers.json", function (err, data) {
    if (err) {
      throw err;
    }
    const _data = JSON.parse(data);
    var filtered = _data.filter(function (el) {
      return !el[argv.name];
    });

    fs.writeFileSync(dir + "/developers.json", JSON.stringify(filtered));
  });
}
