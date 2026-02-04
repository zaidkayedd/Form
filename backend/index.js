// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const morgan = require('morgan');
// const path = require('path');

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import formRouter from './routes/form.js';
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(
  cors({
    origin: "http://localhost:5000",
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan('dev'));
app.use('/api/form', formRouter);

// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error', err);
    process.exit(1);
  });


app.use('/api/form', formRouter);

app.get('/', (req, res) => res.json({ status: 'ok' }));

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Server listening on ${port}`)
);
