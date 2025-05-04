const express = require('express')
const {HandleGenerateShortURL,handleGetAnalytics} = require('../Controllers/url')
const router = express.Router()

router.post('/',HandleGenerateShortURL)

router.get('/analytics/:shortid',handleGetAnalytics)

module.exports = router
