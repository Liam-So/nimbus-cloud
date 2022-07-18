const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;
app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const spotifyRoutes = require('./routes/spotifyRoutes');
const snsRoutes = require('./routes/snsRoutes');

// user routes
app.use('/users', userRoutes);

// spotify auth
app.use('/music', spotifyRoutes);

// sns routes
app.use('/sns', snsRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
