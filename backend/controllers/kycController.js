const crypto = require('crypto');
const { kycRecords, users } = require('../data/db');

const verifyPan = (req, res) => {
  const { pan } = req.body;
  if (!pan || typeof pan !== 'string') {
    return res.status(400).json({ error: 'PAN number is required' });
  }

  // Mock Logic: If PAN length = 10 -> verified, else failed
  if (pan.length === 10) {
    return res.status(200).json({
      status: 'verified',
      data: {
        name: 'Mock User Name',
        dob: '1990-01-01'
      }
    });
  } else {
    return res.status(400).json({ status: 'failed', error: 'Invalid PAN length (must be exactly 10 characters)' });
  }
};

const startKyc = (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  // Verify user exists
  const user = users.find(u => u.id === userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Create pending KYC record
  const kycId = crypto.randomUUID();
  const newKyc = {
    id: kycId,
    userId,
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  kycRecords.push(newKyc);
  res.status(201).json({ message: 'KYC initiated successfully', kyc: newKyc });
};

const kycWebhook = (req, res) => {
  const { kycId } = req.body;
  if (!kycId) {
    return res.status(400).json({ error: 'kycId is required' });
  }

  const record = kycRecords.find(k => k.id === kycId);
  if (!record) {
    return res.status(404).json({ error: 'KYC record not found' });
  }

  record.status = 'verified';
  record.updatedAt = new Date().toISOString();

  res.status(200).json({ message: 'KYC status updated to verified', kyc: record });
};

module.exports = { verifyPan, startKyc, kycWebhook };
