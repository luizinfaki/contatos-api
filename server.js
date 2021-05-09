const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const db = require('./app/models');

db.mongoose.connect(db.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true
})
  .then(() => {
    console.log('sucesso na conexao ao banco de dados.')
  })
  .catch(err => {
    console.log("falha na conexão ao banco de dados.", err);
    process.exit();
  });


let corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: 'ai calica.' });
});

require('./app/routes/contact.routes')(app);
// recebe a porta
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`servidor online http://localhost:${PORT}.`)
})
