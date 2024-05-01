const express = require("express");
const MongoConnection = require("./mongoDB");
const Modal = require("./mongoDB/modals/index");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
const { PORT } = require("./constants");
const routes = require("./routes/index")
const ObjectId = mongoose.Types.ObjectId;

const app = express(express.json());
app.use(bodyParser.json());
app.use(cors());


app.use('/info', routes); 

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  });

app.listen(PORT, async () => {
  console.log(`Server is listening on port ${PORT}`);
  try {
    const connectionState = await MongoConnection();
    if (connectionState) {
      console.log("Connection to MongoDB successful");
    } else {
      console.error("Connection to MongoDB failed");
    }
  } catch (error) {
    console.error("Error in MongoDB connection:", error);
  }
});
