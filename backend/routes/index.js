
const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
// const otherRoutes = require('./otherRoutes'); // For future expansion

router.use('/auth', authRoutes);
// router.use('/other', otherRoutes); // For future expansion

module.exports = router;