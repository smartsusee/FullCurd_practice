const express = require('express');
const { getFun } = require('./curd');

const router =  express.Router()


router.get("/dataGet", getFun)

module.exports = router