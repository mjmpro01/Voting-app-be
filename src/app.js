
const express = require('express');
const { PORT } = require('./config');
const userRoutes = require('./routes/userRoutes');
const { authenticate } = require('./middlewares/authMiddleware');
require('./utils/dbUtils');

const app = express();

app.use(express.json());
app.use(authenticate);
app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});