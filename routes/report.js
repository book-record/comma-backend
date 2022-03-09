const express = require('express');

const reportController = require('../controllers/report');
const {
  validateUserId,
  validateReport,
  validateReportId,
} = require('../middlewares/validators');
const router = express.Router();

router.get('/:id/list', validateUserId, reportController.getReportList);

router.post('/new', validateReport, reportController.createReport);

router.get('/:id', validateReportId, reportController.getReport);

module.exports = router;
