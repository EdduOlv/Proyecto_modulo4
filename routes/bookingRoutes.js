const express = require("express")
const Booking = require("../controller/bookingController")

const bookingRouter = express.Router()

bookingRouter.post("/reserva", Booking.createBooking)
bookingRouter.get("/reserva", Booking.getBooking)
bookingRouter.get("reserva/:id", Booking.getBookingById)
bookingRouter.put("reserva/:id", Booking.updateBookingById)
bookingRouter.delete("reserva/:id", Booking.deleteBookingById)
module.exports = bookingRouter