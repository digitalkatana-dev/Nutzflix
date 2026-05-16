const { Router } = require('express');
const { model } = require('mongoose');
const requireAuth = require('../middleware/requireAuth');
const Profile = model('Profile');

const router = Router();

module.exports = router;
