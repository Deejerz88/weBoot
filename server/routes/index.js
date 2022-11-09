const imageRouter = require('./image.js')

const router = require('express').Router();

router.use('/image', imageRouter);


module.exports = router; 