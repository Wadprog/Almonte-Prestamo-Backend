const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
const cors = require("cors");

const app = express();
app.use(express.json({ extended: false }));
app.use(cors());
// connection to database;
connectDB();


//use the routes

app.use("/api/client", require("./routes/api/client"));
app.use("/api/plan", require("./routes/api/plan"));
app.use("/api/loan", require("./routes/api/loan"));
app.use("/api/user", require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/city", require("./routes/api/city"));
app.use("/api/payment", require("./routes/api/payment"));
app.use("/api/statistic", require("./routes/api/statistic"));
app.use("/api/expense", require("./routes/api/expense"));
app.use("/api/doc", require("./routes/api/doc"));
app.use("/api/clientwloan", require("./routes/api/clientwloan"));

app.use(express.static("client/build"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const PORT = process.env.Port || 80;
app.listen(PORT, () => console.log(`Server runing on port ${PORT}`));
