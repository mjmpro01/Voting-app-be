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
  
app.get("/admin", requirePermission("user"), function(req, res) {
  res.send("Welcome, user!");
});

app.post("/polls", requirePermission("admin"), pollController.prototype.createPoll);
app.get("/polls/:id", requirePermission("admin"), voteController.prototype.getVotesByPollId);
app.post("/candidates", requirePermission("admin"), candidateController.prototype.createCandidate);
app.post("/vote", requirePermission("user"), voteController.prototype.createVote)

app.listen(3000, () => {
console.log('Server is listening on port 3000');
});