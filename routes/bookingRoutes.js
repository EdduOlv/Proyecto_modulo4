const express = require("express")
const Booking = require("../controller/bookingController")

const bookingRouter = express.Router()

bookingRouter.post("/reserva", Booking.createBooking)
bookingRouter.get("/reserva", Booking.getBooking)

module.exports = bookingRouter