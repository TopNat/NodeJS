import http from "http";
import fs from "fs";

const getUsers = () => {
  return fs.readFileSync("./src/data/users.json");
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://127.0.0.1");
  const searchParamsKeys = url.searchParams.keys();
  let isEmpty = false;
  for (let p of searchParamsKeys) {
    isEmpty = true;
  }

  if (!isEmpty) {
    res.statusCode = 200;
    res.statusMessage = "OK";
    res.header = "Content-Type: text/plain";
    res.end("Hello World!\n");
    return;
  } else {
    if (url.searchParams.has("users")) {
      res.statusCode = 200;
      res.statusMessage = "OK";
      res.header = "Content-Type: application/json";
      res.write(getUsers());
      res.end();
      //return;
    } else if (url.searchParams.has("hello")) {
      const helloParam = url.searchParams.get("hello");

      if (helloParam.length > 0) {
        res.statusCode = 200;
        res.statusMessage = "OK";
        res.header = "Content-Type: text/plain";
        res.end(`Hello ${helloParam}!\n`);
      } else {
        res.statusCode = 400;
        res.header = "Content-Type: text/plain";
        res.end(`Enter a name\n`);
      }
      return;
    } else {
      res.statusCode = 500;
      res.header = "Content-Type: text/plain";
      res.end(`\n`);
      return;
    }
  }
});

server.listen(3003, () => {
  console.log("port 3003");
});
