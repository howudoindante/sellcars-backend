const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./routes/Auth/AuthRouter');
const DATABASE_URL = "mongodb://localhost/sellcars";
const authWorker = require("./routes/Auth/AuthRouter");
const adWorker = require("./routes/Advertisement/AdRouter");
const dotenv = require("dotenv");
dotenv.config({ path: './.env' });

mongoose.connect(DATABASE_URL, { useNewUrlParser: true });
app.use(router);
app.use(cors());
app.use(express.json());
app.use("/auth",authWorker);
app.use("/advert",adWorker);
// const db = mongoose.connection;


// db.on("error", error => console.log(error));

// db.on('connected', () => {
//     console.log("connected");
// });

app.listen(port = 5000, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = router;