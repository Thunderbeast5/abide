// // const express = require('express');
// // const router = express.Router();
// // const authController = require('../controllers/authController');
// // const { requireAuth } = require('../middlewares/authMiddleware');

// // // Public routes
// // router.post('/signup', authController.signup);
// // router.post('/login', authController.login);

// // // Protected route example
// // // router.get('/profile', requireAuth, (req, res) => {
// // //     res.status(200).json({ user: req.user });
// // // });


// // // Protected route to verify user
// // router.get('/verify', requireAuth, (req, res) => {
// //   res.status(200).json({ user: req.user });
// // });

// // // Logout route
// // router.get('/logout', authController.logout);

// // module.exports = router;
// const express = require("express");
// const router = express.Router();
// const authController = require("../controllers/authController");
// const { requireAuth } = require("../middlewares/authMiddleware");

// // ✅ Public Routes (No Authentication Required)
// router.post("/signup", authController.signup);
// router.post("/login", authController.login);

// // ✅ Protected Route - Returns Current User
// router.get("/me", requireAuth, (req, res) => {
//   res.status(200).json({ user: req.user });
// });

// // ✅ Logout Route
// router.get("/logout", authController.logout);

// module.exports = router;
// const express = require('express');
// const router = express.Router();
// const authController = require('../controllers/authController');
// const { requireAuth } = require('../middlewares/authMiddleware');

// // Public routes
// router.post('/signup', authController.signup);
// router.post('/login', authController.login);

// // Protected route example
// // router.get('/profile', requireAuth, (req, res) => {
// //     res.status(200).json({ user: req.user });
// // });


// // Protected route to verify user
// router.get('/verify', requireAuth, (req, res) => {
//   res.status(200).json({ user: req.user });
// });

// // Logout route
// router.get('/logout', authController.logout);

// module.exports = router;
const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { requireAuth } = require("../middlewares/authMiddleware");

// ✅ Public Routes (No Authentication Required)
router.post("/signup", authController.signup);
router.post("/login", authController.login);

// ✅ Protected Route - Returns Current User
router.get("/me", requireAuth, (req, res) => {
  res.status(200).json({ user: req.user });
});

// ✅ Logout Route
router.get("/logout", authController.logout);

module.exports = router;
