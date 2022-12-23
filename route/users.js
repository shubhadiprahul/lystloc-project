const express = require('express');
const router = express.Router()
const {addData,verifytoken} = require('../controller/users')

router.post('/addData',addData)
router.post('/verifytoken',verifytoken)

module.exports = router;