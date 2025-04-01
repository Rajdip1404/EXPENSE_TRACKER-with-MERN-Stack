const express = require('express');
const {project} = require('../middlewares/auth.middleware');
const {getDashboardData} = require('../controllers/dashboard.controller')

const router = express.Router();

router.get('/', project, getDashboardData);

module.exports = router;