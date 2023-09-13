const router = require('express').Router();

const { createValidation } = require('../middlewares/validation');
const { createUser } = require('../controllers/users');

router.post('/signup', createValidation, createUser);

module.exports = router;
