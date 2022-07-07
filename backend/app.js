const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;
app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/userRoutes');

// user routes
app.get('/', (req, res) => {
  res.json({ message: 'test' });
});

app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
