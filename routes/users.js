var express = require('express');
var router = express.Router();

const { db } = require('../external-services/firebase-admin-connect');

router.post('/', async (req, res, next) => {
  try {
    const snap = await db.ref(`/user/${req.body.id}`).once('value');
    const data = snap.val();

    const success = true;
    let message = '';

    if (data.uid) {
      message = '成功取得資料';
    } else {
      success = false;
      message = '查無此 user 資料';
    }
    res.status(200).json({
      success,
      message,
      user: {
        email: data.email,
        nickname: data.nickname,
      },
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: '查無此 user 資料',
    });
  }
});

module.exports = router;
