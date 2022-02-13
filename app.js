require("dotenv").config();
const express = require("express");

const port = process.env.PORT || 3000;
const app = express();

const mountRoutes = require("./routes/index");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
mountRoutes(app);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
