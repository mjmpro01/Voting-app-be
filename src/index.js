import express from 'express';
import cors from 'cors';

const voteController = require('./controllers/voteController.js');
const userController = require('./controllers/userController.js');
const pollController = require('./controllers/pollController.js');
// const candidateController = require('./controllers/candidateController.js');
const { requirePermission, verifyToken } = require('./middlewares/auth');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/register', userController.register);

app.post('/login', userController.login);

app.get('/users',verifyToken(), requirePermission("User") , userController.getAllUsers);
app.post("/polls",verifyToken(), requirePermission("Admin"), pollController.createPoll);
app.get("/polls", verifyToken(), requirePermission("User"), pollController.getPollByUserId);
app.get("/polls/:id", verifyToken(), requirePermission("User"), pollController.getPollDetail);
app.post("/polls/:id/votes", verifyToken(), requirePermission("User"), voteController.createVote);
app.get("/polls/:id/candidate", verifyToken(), requirePermission("User"), pollController.getCandidateByPollId);

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});