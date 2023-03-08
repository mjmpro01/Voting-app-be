import express from 'express';
import cors from 'cors';

const voteController = require('./controllers/voteController.js');
const userController = require('./controllers/userController.js');
const pollController = require('./controllers/pollController.js');
const candidateController = require('./controllers/candidateController.js');
const { requirePermission } = require('./middlewares/auth');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/register', userController.prototype.register);

app.post('/login', userController.prototype.login);

app.get('/users',requirePermission("Admin") , userController.prototype.getAllUsers);
app.post("/polls", requirePermission("Admin"), pollController.prototype.createPoll);
app.get("/polls", requirePermission("user"), pollController.prototype.getAllPolls);
app.get("/logs/polls/:id", requirePermission("Admin"), voteController.prototype.getVotesByPollId);
app.post("/candidates", requirePermission("Admin"), candidateController.prototype.createCandidate);
app.get("/candidates/:id", requirePermission("user"), candidateController.prototype.getAllCandidateOfPoll);
app.post("/vote", requirePermission("user"), voteController.prototype.createVote)

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});