var express = require('express')
var router = express.Router()
var event = require('../controllers/event_ctrl')
const middileware = require('../middileware')


router.get('/', event.getAllEvents);
router.post('/getEventBySlug', event.getEventBySlug);
router.post('/add', middileware.checkAuthentication, event.add);
router.put('/edit', middileware.checkAuthentication, event.edit);
router.delete('/delete', middileware.checkAuthentication, event.delete);
router.post('/getEventsByUserId', event.getEventsByUserId);


router.post('/getEventsByCategoryname', event.getEventsByCategoryname);
router.post('/getEventsByCategoryId', event.getEventsByCategoryId);
router.get('/getAllEventsCategory', event.getAllEventsCategory);
router.post('/addEventCategory', middileware.checkAuthentication, event.addEventCategory);
router.put('/editEventCategory', middileware.checkAuthentication, event.editEventCategory);
router.delete('/deleteEventCategory', middileware.checkAuthentication, event.deleteEventCategory);



module.exports = router