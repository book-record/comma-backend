const express = require('express');

const reportController = require('../controllers/report');
const router = express.Router();

router.get('/:id/list', reportController.getReportList);

router.post('/new', reportController.createReport);

module.exports = router;
