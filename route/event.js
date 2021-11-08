var express = require('express')
var router = express.Router()
var event = require('../controllers/event_ctrl') 
const middileware = require('../middileware')


router.get('/', event.getAllEvents);

router.post('/add',middileware.checkAuthentication, event.add);
router.put('/edit',middileware.checkAuthentication, event.edit);
router.delete('/delete',middileware.checkAuthentication, event.delete);
router.post('/getEventsByUserId', event.getEventsByUserId);


module.exports = router