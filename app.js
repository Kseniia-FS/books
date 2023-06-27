const express = require("express");
const cors = require("cors");
const logger = require("morgan");
require("dotenv").config();
const mongoose = require("mongoose");

const PORT = process.env.PORT;
const DB_HOST = process.env.DB_HOST;

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

// app.use((error, _, res, _) => {
// res.status(500).json({
// message: error.message,
// });
// });

mongoose
.connect(DB_HOST)
.then(() => {
console.log("DB Connected!");
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});
})
.catch((error) => {
console.error(error);
process.exit(1);
});

// app.listen(PORT, () => {
// console.log(`Server is running on port ${PORT}`);
// });
