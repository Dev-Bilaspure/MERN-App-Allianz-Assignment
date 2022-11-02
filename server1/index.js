const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require('cors');
const evaluationRoute = require('./routes/evaluation')

dotenv.config();
    
//middleware
app.use(morgan("common"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors())

const PORT = process.env.PORT || 5000;

const URL = process.env.MONGODB_URL;
mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, err => {
  if(err) 
      throw err;
  console.log('Connected to mongodb')
})

app.use("/api/evaluation", evaluationRoute);

app.get('/', (req,res) => {
  res.send("Melcome of home page");
})



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});