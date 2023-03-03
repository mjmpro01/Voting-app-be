import express from 'express';
import cors from 'cors';

const userController = require('./controllers/userController.js');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/register', userController.prototype.register);

app.post('/login', userController.prototype.login);
  
app.listen(3000, () => {
console.log('Server is listening on port 3000');
});