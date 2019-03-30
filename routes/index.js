const router = require('express').Router();

router.use('/auth', require('./users'));
router.use('/characters', require('./characters'))

module.exports = router;