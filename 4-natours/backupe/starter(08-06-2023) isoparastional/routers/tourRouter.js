const express = require('express');
const tourController = require('./../controller/tourController');

const router = express.Router();

// router.param('id', tourController.CheckID);

router
  .route('/top-tour')
  .get(tourController.topFivetour, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourstats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTours);

router
  .route('/:id')
  .get(tourController.getTours)
  .patch(tourController.updateTours)
  .delete(tourController.deleteTours);

module.exports = router;
