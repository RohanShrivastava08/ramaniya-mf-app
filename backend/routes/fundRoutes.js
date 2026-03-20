const express = require('express');
const { listFunds, invest, getPortfolio } = require('../controllers/fundController');

const router = express.Router();

router.get('/funds', listFunds);
router.post('/invest', invest);
router.get('/portfolio/:userId', getPortfolio);

module.exports = router;
