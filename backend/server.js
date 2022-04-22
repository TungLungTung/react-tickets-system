const path = require('path');
const express = require('express'); /// Commond Modules JS
const dotenv = require('dotenv').config();
const colors = require('colors');
const PORT = process.env.PORT || 8000;

/// Server
const { connectDB } = require('./config/db');
/// Connect to DB
connectDB();

const app = express();

/// Middleware - data must pass to this middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
/// Middleware - handler Error handler
const { errorHandler } = require('./middleware/errorMiddleware.js');

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Support Desk API'
  });
});

/// ROUTES
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));
app.use(errorHandler);

/// Server FrontEnd
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
}

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
