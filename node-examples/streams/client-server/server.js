import http from "node:http";
import { Readable } from "node:stream";

function* run() {
  for (let i = 0; i < 99; i++) {
    yield `Print-${i}`;
  }
}

function handler(req, res) {
  const readableStream = new Readable({
    read() {
      for (const data of run()) {
        this.push(JSON.stringify(data).concat("\n"));
      }
      this.push(null); // Push null to signal the end of the stream
    },
  });

  readableStream.pipe(res);
}

http.createServer(handler).listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
