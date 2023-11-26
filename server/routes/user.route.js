import express from 'express';

import {
  signInWithGoogle,
  signInWithEmail,
  signUpWithEmail,
} from '../controllers/user.controller.js';

const router = express.Router();

router.post('/signin', signInWithEmail);
router.post('/signup', signUpWithEmail);
router.post('/google', signInWithGoogle);

export default router;
