
// // const express = require('express');
// // const router = express.Router();

// // const authRoutes = require('./authRoutes');
// // // const otherRoutes = require('./otherRoutes'); // For future expansion

// // router.use('/auth', authRoutes);
// // // router.use('/other', otherRoutes); // For future expansion

// // module.exports = router;
// const express = require('express');
// const router = express.Router();

// const authRoutes = require('./authRoutes');
// const progressRoutes = require('./progress');  // ✅ Import the progress routes

// router.use('/auth', authRoutes);
// router.use('/progress', progressRoutes); // ✅ Add progress tracking under `/api/progress`

// module.exports = router;

// const express = require('express');
// const router = express.Router();

// const authRoutes = require('./authRoutes');
// // const otherRoutes = require('./otherRoutes'); // For future expansion

// router.use('/auth', authRoutes);
// // router.use('/other', otherRoutes); // For future expansion

// module.exports = router;
const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const progressRoutes = require('./progress');  // ✅ Import the progress routes

router.use('/auth', authRoutes);
router.use('/progress', progressRoutes); // ✅ Add progress tracking under `/api/progress`

module.exports = router;
