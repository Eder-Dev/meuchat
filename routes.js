const routes = require('express').Router();
const Consultation = require('./controllers/Consultation')
const Booking = require('./controllers/BookingConsultation')

routes.get('/consultation/list', Consultation.index)
routes.post('/consultation/create', Consultation.create)
routes.post('/consultation/search', Consultation.search)
routes.delete('/consultation/delete', Consultation.delete)

routes.get('/booking/list', Booking.index)
routes.post('/booking/create', Booking.create)
routes.post('/booking/search', Booking.search)
routes.delete('/booking/delete', Booking.delete)

module.exports = routes