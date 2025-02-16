const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (_req: typeof express.Request, res: typeof express.Response) => {
  res.send("Hello, TypeScript with Express using require!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
