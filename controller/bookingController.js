const Booking = require("../model/bookingModel");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

let Bookings = [];

exports.createBooking = async (req, res) => {
  const {
    hotel,
    room,
    numGuets,
    roomCategory,
    entryDate,
    egressDate,
    guestName,
    guestEmail,
    guestPhone,
    paymentStatus,
  } = req.body;

  const formatedEntryDate = moment(entryDate, "DD-MM-YYYY").format("YYYY-MM-DD");
  const formatedEgressDate = moment(egressDate, "DD-MM-YYYY").format("YYYY-MM-DD");
  
  
  const newBooking = new Booking(
    uuidv4(),
    hotel,
    room,
    numGuets,
    roomCategory,
    formatedEntryDate,
    formatedEgressDate,
    guestName,
    guestEmail,
    guestPhone,
    paymentStatus,
    moment().format("YYYY-MM-DD HH:MM:SS"));

    Bookings.push(newBooking)

    res.json({ msg: "Reserva agendada con exito", data: newBooking });
};

exports.getBooking = async (req, res) =>{
    const {hotel} = req.query
    if (hotel) {
        const bookingFiltered = Bookings.filter(booking => booking.hotel === hotel);
        if (bookingFiltered.length === 0) {
            return res.status(404).json({ msg: 'No se encontraron reservas' });
        }

        return res.json({
            msg: "Reservas",
            data: bookingFiltered
        })
    }else{
        return res.json({
            msg: "Reservas",
            data: Bookings
        })
    }
}

exports.getBookingById = async (req, res) =>{
    const {bookId} = req.params.id
    const booking = Bookings.find(booking.id === bookId)

    if (!booking) {
        return res.status(404).json({ msg: 'No se encontraro ninguna reserva' });
    }

    return res.json({
        msg: "Reserva encontrada con exito",
        data: booking
    })
}

exports.updateBookingById= async (req, res) =>{
    const {bookId} = req.params.id
    const bookingIndex = Bookings.findIndex(booking => booking.id === bookId)

    if (bookingIndex === -1) {
        return res.status(404).json({ msg: 'No se encontraro ninguna reserva' });
    }

    
    Bookings[bookingIndex] = { ...Bookings[bookingIndex], ...req.body}

    return res.json({
        msg: "Reserva actualizada con exito",
        data: Bookings[bookingIndex]
    })
}

exports.deleteBookingById= async (req, res) =>{
    const {bookId} = req.params.id
    const bookingIndex = Bookings.findIndex(booking => booking.id === bookId)

    if (bookingIndex === -1) {
        return res.status(404).json({ msg: 'No se encontraro ninguna reserva' });
    }

    Bookings.splice(bookingIndex, 1)

    return res.json({
        msg: "Reserva eliminada con exito",
    })
}