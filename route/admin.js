var express = require('express')
var router = express.Router()
var admin = require('../controllers/admin_ctrl')
const middileware = require('../middileware')
// define the home page route
// router.get('/', admin.test);

router.post('/userRegistration', admin.userRegistration);
router.post('/userLogin', admin.userLogin);
router.post('/getUserByToken', admin.getUserByToken);
router.get('/emailVerification/:token', admin.emailVerification);
router.post('/forgotPassword', admin.forgotPassword);
router.post('/resetPassword', admin.resetPassword);
router.post('/changePassword', admin.changePassword);






module.exports = router;