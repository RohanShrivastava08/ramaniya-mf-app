const users = [];
const kycRecords = [];
const investments = [];

// Static list of 5 mutual funds
const funds = [
  { id: 'f1', name: 'Axis Bluechip Fund', category: 'Equity', nav: 45.20, returns: '18.2%' },
  { id: 'f2', name: 'Mirae Asset Emerging Bluechip', category: 'Equity', nav: 89.50, returns: '22.5%' },
  { id: 'f3', name: 'SBI Magnum Gilt Fund', category: 'Debt', nav: 54.10, returns: '7.8%' },
  { id: 'f4', name: 'HDFC Liquid Fund', category: 'Debt', nav: 4200.50, returns: '6.5%' },
  { id: 'f5', name: 'ICICI Prudential Equity & Debt', category: 'Hybrid', nav: 210.30, returns: '14.1%' },
];

module.exports = {
  users,
  kycRecords,
  investments,
  funds
};
