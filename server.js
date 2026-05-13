const http = require("http");
const fs = require("fs");
const path = require("path");

const host = "127.0.0.1";
const port = 5173;
const root = __dirname;

const types = {
  ".css": "text/css;charset=utf-8",
  ".html": "text/html;charset=utf-8",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript;charset=utf-8",
  ".json": "application/json;charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

const server = http.createServer((request, response) => {
  const url = new URL(request.url, `http://${host}:${port}`);
  let file = path.join(root, decodeURIComponent(url.pathname));

  if (!file.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    file = path.join(file, "index.html");
  }

  fs.readFile(file, (error, data) => {
    if (error) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    response.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream" });
    response.end(data);
  });
});

server.listen(port, host, () => {
  console.log(`Game is running: http://${host}:${port}`);
});
