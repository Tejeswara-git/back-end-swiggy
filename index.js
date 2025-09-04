const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const vendorrouter = require("./routes/vendorroute");
const firmrouter = require("./routes/firmroutes");
const productrouter = require("./routes/productroute");
const bodyParser = require("body-parser");
const path = require("path");

dotenv.config();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
const PORT = process.env.PORT || 5000;

app.use("/vendor", vendorrouter);
app.use("/firm", firmrouter);
app.use("/product", productrouter);
app.use("/uploads", express.static("uploads"));
// // Serve static files from the React app build directory
// app.use(express.static(path.join(__dirname, "../client/client/dist")));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB :", err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
app.get("/", (req, res) => {
  res.send("Hello from server!");
});

// // Catch all handler: send back React's index.html file for client-side routing
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/client/dist/index.html"));
// });
