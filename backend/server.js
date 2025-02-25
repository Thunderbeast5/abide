// // // const express = require('express');
// // // const cors = require('cors');
// // // const connectDB = require('./config/db');
// // // const routes = require('./routes');
// // // require('dotenv').config();
// // // const cookieParser = require('cookie-parser');

// // // const app = express();
// // // const port = process.env.PORT || 3000;

// // // // Connect to MongoDB
// // // connectDB();

// // // // Middleware setup
// // // app.use(express.json());
// // // app.use(express.urlencoded({ extended: false }));


// // // app.use(cookieParser());

// // // app.use(cors({ 
// // //     origin: 'http://localhost:5173', 
// // //     credentials: true 
// // // }));

// // // // Routes
// // // app.use('/api', routes);


// // // app.listen(port, () => {
// // //     console.log(`Server running at http://localhost:${port}`);
// // // });
// // const express = require('express');
// // const cors = require('cors');
// // const connectDB = require('./config/db');
// // const routes = require('./routes');
// // require('dotenv').config();
// // const cookieParser = require('cookie-parser');

// // const app = express();
// // const port = process.env.PORT || 3000;

// // // Connect to MongoDB
// // connectDB();

// // // Middleware setup
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: false }));


// // app.use(cookieParser());

// // app.use(cors({
// //     origin: ['http://localhost:5173', 'https://vedant-ajlz.onrender.com'],
// //     credentials: true
// // }));
// // // Routes
// // app.use('/api', routes);


// // app.listen(port, () => {
// //     console.log(`Server running at http://localhost:${port}`);
// // });
// // const express = require('express');
// // const cors = require('cors');
// // const connectDB = require('./config/db');
// // const routes = require('./routes');
// // require('dotenv').config();
// // const cookieParser = require('cookie-parser');

// // const app = express();
// // const port = process.env.PORT || 3000;

// // // Connect to MongoDB
// // connectDB();

// // // Middleware setup
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: false }));


// // app.use(cookieParser());

// // app.use(cors({ 
// //     origin: 'http://localhost:5173', 
// //     credentials: true 
// // }));

// // // Routes
// // app.use('/api', routes);


// // app.listen(port, () => {
// //     console.log(`Server running at http://localhost:${port}`);
// // });
// const express = require('express');
// const cors = require('cors');
// const mongoose = require("mongoose");
// const connectDB = require('./config/db'); // Ensure you have a DB connection file
// const routes = require('./routes'); // Main API routes
// const progressRoutes = require("./routes/progress"); // Import progress routes
// require('dotenv').config();
// const cookieParser = require('cookie-parser');

// const app = express();
// const port = process.env.PORT || 3000;

// // ✅ Connect to MongoDB
// connectDB();

// // ✅ Middleware setup
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// // app.use(cors({ 
// //     origin: 'http://localhost:5173', 
// //     credentials: true 
// // }));
// app.use(cors({ 
//     origin: ['http://localhost:5173', 'https://vedant-ajlz.onrender.com'], 
//     credentials: true 
// }));

// // ✅ Main Routes
// app.use('/api', routes); // Other API routes
// app.use('/api/progress', progressRoutes); // Progress API


// // ✅ Start Server
// app.listen(port, () => {
//     console.log(`🚀 Server running at http://localhost:${port}`);
// });
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const connectDB = require('./config/db'); // Ensure you have a DB connection file
const routes = require('./routes'); // Main API routes
const progressRoutes = require("./routes/progress"); // Import progress routes
require('dotenv').config();
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 3000;

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ 
    origin: 'http://localhost:5173', 
    credentials: true 
}));

// ✅ Main Routes
app.use('/api', routes); // Other API routes
app.use('/api/progress', progressRoutes); // Progress API


// ✅ Start Server
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
