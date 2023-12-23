const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/topten').get(tourController.getTopTen, tourController.getTour);

router.route('/getstats').get(tourController.getStats);

router
  .route('/')
  .get(authController.protect, tourController.getTour)
  .patch(tourController.updateTour)
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.searchTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour,
  );

module.exports = router;
