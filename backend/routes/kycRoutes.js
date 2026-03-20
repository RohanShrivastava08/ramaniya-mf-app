const express = require('express');
const { verifyPan, startKyc, kycWebhook } = require('../controllers/kycController');

const router = express.Router();

router.post('/pan-verify', verifyPan);
router.post('/kyc/start', startKyc);
router.post('/webhook/kyc', kycWebhook);

module.exports = router;
