import http from "http";
import fs from "fs";

const getUsers = () => {
  return fs.readFileSync("./src/data/users.json");
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://127.0.0.1");
  console.log(url); 
  const searchParamsKeys = url.searchParams.keys();
  console.log("searchParamsKeys=", searchParamsKeys);
  /*
  let isEmpty = false;
  for (let p of searchParamsKeys) {
    // console.log(p);
    isEmpty = true;
  }
  console.log(isEmpty);
*/
  res.statusCode = 200;
  res.statusMessage = "OK";
  res.header = "Content-Type: text/plain";
  res.end("Hello World!\n");
});

server.listen(3003, () => {
  console.log("port 3003");
});
