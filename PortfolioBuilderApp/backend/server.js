const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRouter = require("./routes/authRoutes.js")
const portfoliosRouter = require("./routes/portfolioRoutes.js")

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ DB Connected"))
  .catch(err => console.error(err));


app.use('/api/auth', authRouter);
app.use('/api/portfolios', portfoliosRouter);
app.use('/api/admin', require('./routes/admin'));
app.use('/api/notices', require('./routes/noticeRoutes'));



// Test Route
app.get('/api/status', (req, res) => res.json({ status: "Server is Live" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server on port ${PORT}`));