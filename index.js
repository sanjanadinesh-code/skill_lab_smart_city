// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const complaintRoutes = require("./routes/complaintRoutes");

// const app = express();

// // Middleware
// app.use(bodyParser.json());
// app.use(cors());

// // Routes
// app.use("/complaints", complaintRoutes);

// // Server
// const PORT = 000;
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });
const express = require("express");
const bodyParser = require("body-parser");
const complaintRoutes = require("./routes/complaintRoutes");

const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mount complaint routes
app.use("/complaints", complaintRoutes);

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
