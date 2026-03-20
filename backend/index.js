const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const kycRoutes = require('./routes/kycRoutes');
const fundRoutes = require('./routes/fundRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic Health Check Route
app.get('/', (req, res) => {
  res.send('Ramaniya API running');
});

// Modular Routes
app.use('/auth', authRoutes);
app.use('/', kycRoutes);      // /pan-verify, /kyc/start, /webhook/kyc
app.use('/', fundRoutes);     // /funds, /invest, /portfolio/:userId

app.listen(PORT, () => {
  console.log(`Ramaniya backend server running on http://localhost:${PORT}`);
});
