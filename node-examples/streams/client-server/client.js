import { get } from "node:http";
import { Transform, Writable } from "node:stream";
import { createWriteStream } from "node:fs";

const url = "http://localhost:3000";

const getHttpStream = () =>
  new Promise((resolve) =>
    get(url, (res) => {
      resolve(res);
    })
  );

const stream = await getHttpStream();

stream
  .pipe(
    Transform({
      // objectMode: true,
      transform(chunk, encoding, cb) {
        const item = chunk.toString();
        const number = /\d+/.exec(item)[0];
        const isEven = parseInt(number) % 2 === 0;
        const modifiedResult = JSON.parse(item).concat(
          ` is ${isEven ? "even" : "odd"}`
        );
        cb(null, JSON.stringify(modifiedResult).concat("\n"));
      },
    })
  )
  .pipe(createWriteStream("result.txt", { flags: "a" }))
  // .filter((item) => item.includes("even"))
  // .pipe(
  //   Writable({
  //     // objectMode: true,
  //     write(chunk, encoding, cb) {
  //       console.log(chunk.toString());

  //       cb();
  //     },
  //   })
  // )
