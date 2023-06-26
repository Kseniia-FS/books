const express = require("express");
const cors = require("cors");
const logger = require("morgan");
require("dotenv").config();

const PORT = process.env.PORT;

const bookRouter = require("./src/routers/router");

const app = express();

const loggerFormat = app.get("env") === "development" ? "dev" : "short";

app.use(logger(loggerFormat));
app.use(cors());
app.use(express.json());

app.use("/api/v1", bookRouter);

app.use((req, res) => {
res.status(404).json({
message: "Not found",
});
});

app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});
