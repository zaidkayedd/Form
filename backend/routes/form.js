// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const User = require('../models/User');

import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import User from '../models/User.js';
import sharp from 'sharp';

const router = Router();

/* ---------- Multer setup ---------- */
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

/* ---------- POST form ---------- */
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      email,
      phone,
      birthDate,
      instagram,
    } = req.body;

    if (!email || !firstName || !lastName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

let imageData = null;
if (req.file) {
      // compress image
      const compressedImage = await sharp(req.file.buffer)
        .resize({ width: 800 })       // limit size
        .jpeg({ quality: 70 })        // compress
        .toBuffer();

      imageData = {
        data: compressedImage,
        contentType: 'image/jpeg',
      };
    }
    const user = await User.create({
      firstName,
      middleName,
      lastName,
      email,
      phone,
      birthDate,
      instagram,
      image: imageData,
    });

    res.status(201).json(user);
  } catch (err) {
    console.error(err);

    if (err.code === 11000) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    res.status(500).json({ error: 'Server error' });
  }
});

/* ---------- GET all users ---------- */
router.get('/', async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.json(users);
});

export default router;
