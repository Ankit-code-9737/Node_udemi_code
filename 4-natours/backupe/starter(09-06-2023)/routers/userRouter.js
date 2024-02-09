const express = require('express');
const userController = require('./../controller/userController');
const authController = require('./../controller/authController');

const router = express.Router();

router.post('/signup', authController.signup);

router
  .route('/')
  .get(userController.getallusers)
  .post(userController.createuser);
router
  .route('/:id')
  .get(userController.getuser)
  .patch(userController.userupdate)
  .delete(userController.userdelete);

module.exports = router;
