const express = require('express');
const router = express.Router();

const auth = require('../external-services/firebase-connect');
const { signInWithEmailAndPassword } = require('firebase/auth');

router.post('/', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await signInWithEmailAndPassword(auth, email, password);

    res.status(200).json({
      success: true,
      message: '登入成功',
      id: user.user.uid, // 這裡暫時用 uid，之後學一下 JWT 加密
      expires: Date.now() + 24 * 60 * 60 * 1000,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: '登入失敗',
    });
  }
});

module.exports = router;
