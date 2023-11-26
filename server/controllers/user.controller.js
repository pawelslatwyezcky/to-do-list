import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import axios from 'axios';

import { User } from '../models/user.schema.js';
import { oAuth2Client } from '../index.js';

dotenv.config();

export const signInWithEmail = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: 'User does not exist!' });

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword)
      return res.status(400).json({ message: 'Password is incorrect!' });

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.SECRET_TOKEN,
      { expiresIn: '1h' }
    );

    res.status(200).json({ result: user, token });
  } catch (error) {
    res.status(500).json({
      message: 'Smth went wrong in user controller at signInWithEmail!',
    });
  }
};

export const signUpWithEmail = async (req, res) => {
  const { email, name, password } = req.body;

  try {
    const emailExist = await User.findOne({ email });

    if (emailExist)
      return res
        .status(400)
        .json({ message: 'User with this email already exist!' });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      name,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.SECRET_TOKEN,
      { expiresIn: '1h' }
    );

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({
      message: 'Smth went wrong in user controller at signUpWithEmail!',
    });
  }
};

export const signInWithGoogle = async (req, res) => {
  const { tokens } = await oAuth2Client.getToken(req.body.code); // exchange code for tokens

  try {
    const { data } = await axios.get(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${tokens.id_token}`
    );
    const user = await User.findOne({ email: data.email });
    if (!user) {
      const result = await User.create({
        email: data.email,
        name: data.name.split(' ')[0],
      });
      const token = jwt.sign(
        { email: result.email, id: result._id },
        process.env.SECRET_TOKEN,
        { expiresIn: '1h' }
      );
      res.status(200).json({ result, token });
    } else {
      const token = jwt.sign(
        { email: user.email, id: user._id },
        process.env.SECRET_TOKEN,
        { expiresIn: '1h' }
      );
      res.status(200).json({ result: user, token });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: 'Smth went wrong in user controller at signInWithGoogle!',
    });
  }
};
