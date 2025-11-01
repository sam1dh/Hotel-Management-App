const express = require('express');
const tourController = require('../controllers/tourController'); // Fixed typo
const router = express.Router();

// router.param('id', tourController.checkID); // Use corrected reference
router
  .route('/')
  .get(tourController.getAllTours)
  .post( tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;