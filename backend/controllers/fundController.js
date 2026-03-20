const crypto = require('crypto');
const { funds, investments, users } = require('../data/db');

const listFunds = (req, res) => {
  res.status(200).json({ funds });
};

const invest = (req, res) => {
  const { userId, fundName, amount } = req.body;
  if (!userId || !fundName || !amount) {
    return res.status(400).json({ error: 'userId, fundName, and amount are required' });
  }

  // Verify user exists
  if (!users.find(u => u.id === userId)) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Execute mock investment
  const newInvestment = {
    id: crypto.randomUUID(),
    userId,
    fundName,
    amount,
    status: 'success',
    timestamp: new Date().toISOString()
  };

  investments.push(newInvestment);
  res.status(201).json({ message: 'Investment successful', investment: newInvestment });
};

const getPortfolio = (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ error: 'userId parameter is required' });
  }

  // Aggregate user investments
  const userInvestments = investments.filter(inv => inv.userId === userId);
  res.status(200).json({ investments: userInvestments });
};

module.exports = { listFunds, invest, getPortfolio };
