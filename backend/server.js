const express = require('express');
const cors = require('cors');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
app.use(cors());
app.use(express.json());

const dashboardRoutes = require('./routes/dashboardRoutes');
app.use('/api/dashboard', dashboardRoutes);

const adminRoutes = require('./routes/adminRoutes');
app.use('/api/admin', adminRoutes);

const booksRoutes = require('./routes/booksRoutes');
app.use('/api/books', booksRoutes);

const logsRoutes = require('./routes/logsRoutes');
app.use('/api/logs', logsRoutes);

const memberRoutes = require('./routes/memberRoutes'); // ✅ NEW
app.use('/api/members', memberRoutes);                // ✅ NEW

app.get('/api/books/csv', (req, res) => {
  const results = [];
  fs.createReadStream('data/books.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => res.json(results));
});

app.get('/', (req, res) => {
  res.send("<h1>Hello world</h1>");
});

app.listen(5050, () => {
  console.log('Server running on port 5050');
});
