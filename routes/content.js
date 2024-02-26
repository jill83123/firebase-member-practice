const express = require('express');
const router = express.Router();

const { db } = require('../external-services/firebase-admin-connect');

const { body, validationResult } = require('express-validator');
const postContentRequire = body('content').notEmpty().trim().isLength({ min: 1 }).withMessage('內容不得為空');

router.post('/', postContentRequire, async (req, res, next) => {
  const result = validationResult(req);

  try {
    if (result.errors.length === 0) {
      const snap = await db.ref(`/user/${req.body.id}`).once('value');
      const data = snap.val();

      const ref = await db.ref('/contents').push();
      ref.set({ email: data.email, nickname: data.nickname, content: req.body.content });

      res.status(200).json({
        success: true,
        message: '新增留言成功',
      });
    } else {
      res.status(400).json({
        success: false,
        message: `新增留言失敗，${result.errors[0]?.msg}`,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: '新增留言失敗',
    });
  }
});

router.get('/', async (req, res, next) => {
  try {
    const snap = await db.ref('/contents').once('value');
    const data = snap.val();

    res.status(200).json({
      success: true,
      message: '取得留言成功',
      contents: data,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      success: false,
      message: '新增留言失敗',
    });
  }
});

module.exports = router;
