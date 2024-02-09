const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();
// process.env.UV_THREADPOOL_SIZE = 1;

setTimeout(() => console.log("Time 1 finish"), 0);
setImmediate(() => console.log("Time Immediate 1 finish"));

fs.readFile("test-file.txt", () => {
  console.log("Text file read now Or I/O finish");
  console.log("----------");

  setTimeout(() => console.log("Time 2 finish"), 0);
  setTimeout(() => console.log("Time 3 finish"), 3000);
  setImmediate(() => console.log("Time Immediate 2 finish"));

  // process.nextTick (() => console.log ('This is nextTick'));

  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "password encrypted");

  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "password encrypted");

  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "password encrypted");

  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "password encrypted");
});

console.log("Top Ankiii");
