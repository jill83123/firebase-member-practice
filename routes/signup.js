const express = require('express');
const router = express.Router();

const { db, auth } = require('../external-services/firebase-admin-connect');

router.post('/', async (req, res, next) => {
  try {
    const user = await auth.createUser({
      email: req.body.email,
      password: req.body.password,
    });

    const saveUserData = {
      uid: user.uid,
      email: user.email,
      nickname: req.body.nickname,
    };
    db.ref(`/user/${user.uid}`).set(saveUserData);

    res.status(200).json({
      success: true,
      message: '註冊成功',
      userId: user.uid,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
