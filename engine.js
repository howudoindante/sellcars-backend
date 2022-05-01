const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./routes/Auth/AuthRouter');
const authWorker = require("./routes/Auth/AuthRouter");
const adWorker = require("./routes/Advertisement/AdRouter");
const dotenv = require("dotenv");
const fs = require( 'fs' );
const swaggerUi = require( 'swagger-ui-express' );
const swaggerFile = JSON.parse(fs.readFileSync('./swagger/output.json'));
const port = process.env.PORT || 5000;
dotenv.config({ path: './.env' });
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
app.use(router);
app.use(cors());
app.use(express.json());
app.use("/auth",authWorker);
app.use("/advert",adWorker);
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
// const db = mongoose.connection;


// db.on("error", error => console.log(error));

// db.on('connected', () => {
//     console.log("connected");
// });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = router;