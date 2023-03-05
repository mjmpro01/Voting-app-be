import express from 'express';
import cors from 'cors';

const userController = require('./controllers/userController.js');
const { requirePermission } = require('./middlewares/auth');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/register', userController.prototype.register);

app.post('/login', userController.prototype.login);
  
app.get("/admin", requirePermission("user"), function(req, res) {
  res.send("Welcome, user!");
});

app.listen(3000, () => {
console.log('Server is listening on port 3000');
});