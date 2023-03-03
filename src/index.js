
// const express = require('express');
// const { PORT } = require('./config');
// const userRoutes = require('./routes/userRoutes');
// const { authenticate } = require('./middlewares/authMiddleware');
// require('./utils/dbUtils');

// const app = express();

// app.use(express.json());
// app.use(authenticate);
// app.use('/users', userRoutes);

// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });

import express from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import cors from 'cors';
import { pool } from './services/db.js';

const app = express();

app.use(cors());
app.use(express.json());

app.post('/register', async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  };
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('INSERT INTO public."User" (name, password, email, status, "roleId", "majorId") VALUES ($1, $2, $3, $4, $5, $6)', [name, hashedPassword,email,'true',2,1]);
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Kiểm tra xem người dùng có tồn tại trong cơ sở dữ liệu không
    const user = await pool.query('SELECT * FROM users WHERE username = $1', [username]);

    if (user.rows.length === 0) {
      return res.status(401).json({ message: 'Tên đăng nhập hoặc mật khẩu không chính xác' });
    }

    // Kiểm tra mật khẩu của người dùng
    const isPasswordMatch = await bcrypt.compare(password, user.rows[0].password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Tên đăng nhập hoặc mật khẩu không chính xác' });
    }

    // Tạo JWT token
    const token = jwt.sign({ userId: user.rows[0].id }, process.env.JWT_SECRET);

    res.json({ message: 'Đăng nhập thành công', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lỗi' });
  }
  });
  
  app.listen(3000, () => {
  console.log('Server is listening on port 3000');
  });