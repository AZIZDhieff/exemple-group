const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("./middleware/logger");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Utiliser le middleware de journalisation
app.use(logger);

let reservations = [];

app.get("/reservations", (req, res) => {
  res.json(reservations);
});

app.post("/reservations", (req, res) => {
  const reservation = req.body;
  reservation.id = new Date().getTime();
  reservations.push(reservation);
  res.status(201).json(reservation);
});

app.delete("/reservations/:id", (req, res) => {
  const { id } = req.params;
  reservations = reservations.filter(
    (reservation) => reservation.id !== parseInt(id)
  );
  res.status(204).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
