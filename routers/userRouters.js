const express = require('express');

const userController = require('../controllers/userController');

const authController = require('../controllers/authController');

const router = express.Router();

router.post('/login', authController.logIn);
router.post('/signup', authController.signUp);

router.post('/forgotpassword', authController.forgotPassword);
router.patch('/resetpassword/:token', authController.resetPassword);
router.patch(
  '/updatepassword',
  authController.protect,
  authController.updatePassword,
);

router
  .delete('/deleteUser', authController.protect, userController.deleteUser)
  .patch('/updateUser', authController.protect, userController.updateUser);

module.exports = router;
