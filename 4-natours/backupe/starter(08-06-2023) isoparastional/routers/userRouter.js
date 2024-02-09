const express = require('express');
const userController = require('./../controller/userController');

const router = express.Router();

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
