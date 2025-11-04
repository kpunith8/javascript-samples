// const stdin = process.stdin
// console.log("Enter some text (Press Ctrl+C to end):");
// const stdout = process.stdout.on('data', (data) => {
//   console.log(`You have entered: ${data.toString().trim().toUpperCase()}`);
// })

// stdin.pipe(stdout);

// Run this command in CLI to generate a randon large file, generated 1 billion bytes (1 GB) of random data
// node -e "process.stdout.write(crypto.randomBytes(1e9))" > bigfile.txt

// Create a http server to serve the file
import http from "http";
import { readFileSync, createReadStream } from "fs";
http
  .createServer((req, res) => {
    // This reads the entire file into memory, which causes nodejs to crash, without toString() we can send the file but its blocking
    // const file = readFileSync("bigfile.txt").toString(); // Synchronously read the file into memory (not recommended for large files)
    // res.write(file);
    // res.end();
    createReadStream("bigfile.txt").pipe(res);
  })
  .listen(3000, () => console.log("Server is running on the port 3000"));
