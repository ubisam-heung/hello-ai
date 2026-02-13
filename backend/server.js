const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to all API routes
app.use('/api/', limiter);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const mysqlRoutes = require('./routes/mysql');
const mariadbRoutes = require('./routes/mariadb');
const postgresqlRoutes = require('./routes/postgresql');
const oracleRoutes = require('./routes/oracle');

app.use('/api/mysql/users', mysqlRoutes);
app.use('/api/mariadb/users', mariadbRoutes);
app.use('/api/postgresql/users', postgresqlRoutes);
app.use('/api/oracle/users', oracleRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Hello DB API Server',
    endpoints: {
      mysql: '/api/mysql/users',
      mariadb: '/api/mariadb/users',
      postgresql: '/api/postgresql/users',
      oracle: '/api/oracle/users'
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
