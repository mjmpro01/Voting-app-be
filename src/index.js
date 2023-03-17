import express from 'express';
import cors from 'cors';

const voteController = require('./controllers/voteController.js');
const userController = require('./controllers/userController.js');
const pollController = require('./controllers/pollController.js');
const pino = require('pino-http')()
// const candidateController = require('./controllers/candidateController.js');
const { requirePermission, verifyToken } = require('./middlewares/auth');
const app = express();


app.use(pino)

app.use(cors());
app.use(express.json());
app.use(function(req, res, next) {
  req.log.info(`${new Date().toISOString()}] ${req.method} ${req.originalUrl}`)
  next();
});
app.post('/register', userController.register);

app.post('/login', userController.login);

app.get('/users',verifyToken(), requirePermission("User") , userController.getAllUsers);
app.post("/polls",verifyToken(), requirePermission("Admin"), pollController.createPoll);
app.get("/polls", verifyToken(), requirePermission("User"), pollController.getPollByUserId);
app.get("/polls/:id", verifyToken(), requirePermission("User"), pollController.getPollDetail);
app.post("/polls/:id/votes", verifyToken(), requirePermission("User"), voteController.createVote);
app.get("/polls/:id/candidate", verifyToken(), requirePermission("User"), pollController.getCandidateByPollId);
app.get("/me", verifyToken(), requirePermission("User"), userController.getMe)
app.listen(3007, () => {
  console.log('Server is listening on port 3007');
});