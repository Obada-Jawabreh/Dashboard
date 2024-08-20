// routes/contactUsRoutes.js
const express = require('express');
const router = express.Router();
const contactUsController = require('../Controllers/contact usControllers');

// Route to get all queries
router.get('/queries', contactUsController.getAllQueries);



module.exports = router;
