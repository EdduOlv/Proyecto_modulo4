const Booking = require("../model/bookingModel");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

let Bookings = [];

exports.createBooking = async (req, res) => {
  const {
    hotel,
    numGuests,
    roomCategory,
    entryDate,
    egressDate,
    guestName,
    guestEmail,
    guestPhone,
    paymentStatus,
  } = req.body;

  const formatedEntryDate = moment(entryDate,"DD-MM-YYYY").format("YYYY-MM-DD");
  const formatedEgressDate = moment(egressDate, "DD-MM-YYYY").format("YYYY-MM-DD");
  const correctSchedule = moment(formatedEgressDate).isBefore(formatedEntryDate)

  const emailFound = Bookings.find(booking => booking.guestEmail === guestEmail);
  const phoneFound = Bookings.find(booking => booking.guestPhone === guestPhone);

  if (correctSchedule) {
    return res.status(400).json({ msg: 'Ingrese un margen de fechas de ingraso y egreso validas' });
} else if ((roomCategory === "estandar" && numGuests >= 3) || (roomCategory === "doble" && numGuests >= 7)) {
    return res.status(400).json({ msg: `Sobrepasa el numero de huéspedes para una habitacion de categoría ${roomCategory}` });
}else if (emailFound) {
    return res.status(400).json({ msg: `Este email de contacto ya esta registrado`});
}else if (phoneFound) {
    return res.status(400).json({ msg: `Este telefono de contacto ya esta registrado`});
}
  
  const newBooking = new Booking(
    uuidv4(),
    hotel,
    numGuests,
    roomCategory,
    formatedEntryDate,
    formatedEgressDate,
    guestName,
    guestEmail,
    guestPhone,
    paymentStatus,
    moment().format("DD-MM-YYYY HH:MM:SS"));

    Bookings.push(newBooking)

    res.json({ msg: "Reserva agendada con exito", data: newBooking });
};

exports.getBooking = async (req, res) =>{
    const {hotel, tipo_habitacion, fecha_inicio, fecha_fin, estado, num_huespedes, consulta_fecha} = req.query

    if (hotel) {

        const bookingFiltered = Bookings.filter(booking => booking.hotel === hotel);

        if (bookingFiltered.length === 0 ) {

            return res.status(404).json({ msg: 'No se encontraron reservas' });

        }else if (bookingFiltered.length != 0 && !consulta_fecha) {

            return res.json({
                msg: `Las reservas encontradas para el hotel ${hotel} son: `,
                data: bookingFiltered
            })  
        }else if (bookingFiltered.length != 0 && consulta_fecha) {

            const formattedDate = moment(consulta_fecha, "DD-MM-YYYY").format("YYYY-MM-DD");
            const startOfMonthDate = moment(formattedDate).startOf('month');
            const endOfMonthDate = moment(formattedDate).endOf('month');
            const queryByDate = bookingFiltered.filter(booking => moment(booking.entryDate).isBetween(startOfMonthDate, endOfMonthDate, null, '[]'))

            if (queryByDate.length === 0 ) {

                return res.status(404).json({ msg: 'No se encontraron reservas para mes de la consulta' });
            }
            return res.json({
                msg: `Las reservas encontradas para el hotel ${hotel} segun la fecha indicada son: `,
                data: queryByDate
            })  
        }
    }else if (estado) {

        const bookingFiltered = Bookings.filter(booking => booking.paymentStatus === estado);

        if (bookingFiltered.length === 0 ) {

            return res.status(404).json({ msg: 'No se encontraron reservas' });

        }else if (bookingFiltered.length != 0 && !consulta_fecha) {

            return res.json({
                msg: `Las reservas encontradas con el estado ${estado} son: `,
                data: bookingFiltered
            })  
        }else if (bookingFiltered.length != 0 && consulta_fecha) {
           
            const formattedDate = moment(consulta_fecha, "DD-MM-YYYY").format("YYYY-MM-DD");
            const startOfMonthDate = moment(formattedDate).startOf('month');
            const endOfMonthDate = moment(formattedDate).endOf('month');
            const queryByDate = bookingFiltered.filter(booking => moment(booking.entryDate).isBetween(startOfMonthDate, endOfMonthDate, null, '[]'))

            if (queryByDate.length === 0 ) {

                return res.status(404).json({ msg: 'No se encontraron reservas para mes de la consulta' });
            }
            return res.json({
                msg: `Las reservas encontradas con el estado ${estado} segun la fecha indicada son: `,
                data: queryByDate
            })  
        }
    }else if (tipo_habitacion) {

        const bookingFiltered = Bookings.filter(booking => booking.roomCategory === tipo_habitacion);

        if (bookingFiltered.length === 0 ) {

            return res.status(404).json({ msg: 'No se encontraron reservas' });

        }else if (bookingFiltered.length != 0 && !consulta_fecha) {

            return res.json({
                msg: `Las reservas encontradas con el tipo de habitacion ${tipo_habitacion} son: `,
                data: bookingFiltered
            })  
        }else if (bookingFiltered.length != 0 && consulta_fecha) {

            const formattedDate = moment(consulta_fecha, "DD-MM-YYYY").format("YYYY-MM-DD");
            const startOfMonthDate = moment(formattedDate).startOf('month');
            const endOfMonthDate = moment(formattedDate).endOf('month');
            const queryByDate = bookingFiltered.filter(booking => moment(booking.entryDate).isBetween(startOfMonthDate, endOfMonthDate, null, '[]'))

            if (queryByDate.length === 0 ) {

                return res.status(404).json({ msg: 'No se encontraron reservas para mes de la consulta' });
            }
            return res.json({
                msg: `Las reservas encontradas con el tipo de habitacion ${tipo_habitacion} segun la fecha indicada son: `,
                data: queryByDate
            })  
        }
    }else if (num_huespedes) {

        const bookingFiltered = Bookings.filter(booking => booking.numGuests === num_huespedes);

        if (bookingFiltered.length === 0 ) {

            return res.status(404).json({ msg: 'No se encontraron reservas' });

        }else if (bookingFiltered.length != 0 && !consulta_fecha) {

            return res.json({
                msg: `Las reservas encontradas con la cantidad de ${num_huespedes} huespedes son: `,
                data: bookingFiltered
            })  
        }else if (bookingFiltered.length != 0 && consulta_fecha) {

            const formattedDate = moment(consulta_fecha, "DD-MM-YYYY").format("YYYY-MM-DD");
            const startOfMonthDate = moment(formattedDate).startOf('month');
            const endOfMonthDate = moment(formattedDate).endOf('month');
            const queryByDate = bookingFiltered.filter(booking => moment(booking.entryDate).isBetween(startOfMonthDate, endOfMonthDate, null, '[]'))

            if (queryByDate.length === 0 ) {

                return res.status(404).json({ msg: 'No se encontraron reservas para mes de la consulta' });
            }
            return res.json({
                msg: `Las reservas encontradas con la cantidad de ${num_huespedes} huespedes segun la fecha indicada son: `,
                data: queryByDate
            })  
        }
    }else if (fecha_inicio && fecha_fin) {
        
        const formatedEntryDate = moment(fecha_inicio, "DD-MM-YYYY").format("YYYY-MM-DD");
        const formatedEgressDate = moment(fecha_inicio, "DD-MM-YYYY").format("YYYY-MM-DD");
        const bookingFiltered = Bookings.filter(booking => moment(booking.entryDate).isBetween(formatedEntryDate, formatedEgressDate, null, '[]'));

        if (bookingFiltered.length === 0 ) {

            return res.status(404).json({ msg: 'No se encontraron reservas en el margen de fechas indicado' });
        }
        return res.json({
            msg: "Reservas encontradas segun el rango de fechas de la consulta son: ",
            data: bookingFiltered
        })
    }else if (!hotel && !tipo_habitacion && !estado && !num_huespedes && consulta_fecha) {

        const formattedDate = moment(consulta_fecha, "DD-MM-YYYY").format("YYYY-MM-DD");
        const bookingFiltered = Bookings.filter(booking => booking.entryDate === formattedDate);
        
        if (bookingFiltered.length === 0 ) {

            return res.status(404).json({ msg: 'No se encontraron reservas para la fecha indicada' });
        }
        return res.json({
            msg: `Reservas encontradas para la fecha ${consulta_fecha} son: `,
            data: bookingFiltered
        })

    } else {
        return res.json({
            msg: "Reservas",
            data: Bookings
        })
    }
}

exports.getBookingById = async (req, res) =>{
    const id = req.params.id
    const booking = Bookings.find(booking => booking.id === id)
    if (!booking) {
        return res.status(404).json({ msg: 'No se encontro ninguna reserva' });
    }
    return res.json({
        msg: "Reserva encontrada con exito",
        data: booking
    })
}

exports.updateBookingById = async (req, res) =>{
    const id = req.params.id
    const {
        numGuests,
        roomCategory,
        entryDate,
        egressDate,
        guestEmail,
        guestPhone,
    } = req.body;

    const bookingIndex = Bookings.findIndex(booking => booking.id === id)
    
    if (bookingIndex === -1) {
        return res.status(404).json({ msg: 'No se encontro ninguna reserva' });
    }

    if (entryDate || egressDate) {
        if (entryDate && egressDate) {
            const formatedEntryDate = moment(entryDate, "DD-MM-YYYY").format("YYYY-MM-DD");
            const formatedEgressDate = moment(egressDate, "DD-MM-YYYY").format("YYYY-MM-DD");
            const correctSchedule = moment(formatedEgressDate).isBefore(formatedEntryDate)
            if (correctSchedule) {
                return res.status(400).json({ msg: 'Ingrese un margen de fechas de entrada y salida validas' });
            }
        } else if (entryDate && !egressDate){
            const formatedEntryDate = moment(entryDate, "DD-MM-YYYY").format("YYYY-MM-DD");
            const egressDateFound = Bookings.find(booking => booking.id === id);
            const correctSchedule = moment(egressDateFound.egressDate).isBefore(formatedEntryDate)
            if (correctSchedule) {
                return res.status(400).json({ msg: 'Ingrese una fecha de entrada valida' });
            }
        }else if (!entryDate && egressDate){
            const formatedEgressDate = moment(egressDate, "DD-MM-YYYY").format("YYYY-MM-DD");
            console.log(formatedEgressDate);
            const entryDateFound = Bookings.find(booking => booking.id === id);
            const correctSchedule = moment(formatedEgressDate).isBefore(entryDateFound.entryDate)
            if (correctSchedule) {
                return res.status(400).json({ msg: 'Ingrese una fecha de salida valida' });
            }
        }     
    }
 
    const emailFound = Bookings.find(booking => booking.guestEmail === guestEmail);
    const phoneFound = Bookings.find(booking => booking.guestPhone === guestPhone);
    
    if ((roomCategory === "estandar" && numGuests >= 3) || (roomCategory === "doble" && numGuests >= 7)) {
        return res.status(400).json({ msg: `Sobrepasa el numero de huéspedes para una habitacion de categoría ${roomCategory}` });
    }

    if (emailFound || phoneFound) {
        if (id != emailFound.id) {
            return res.status(400).json({ msg: `Este email de contacto ya esta registrado`});
            
        }
        if (id != phoneFound.id) {
            return res.status(400).json({ msg: `Este telefono de contacto ya esta registrado`});
            
        } 
    }

    Bookings[bookingIndex] = { ...Bookings[bookingIndex], ...req.body}
    return res.json({
        msg: "Reserva actualizada con exito",
        data: Bookings[bookingIndex], 
    })  
}

exports.deleteBookingById = async (req, res) =>{
    const id = req.params.id
    const bookingIndex = Bookings.findIndex(booking => booking.id === id)

    if (bookingIndex === -1) {
        return res.status(404).json({ msg: 'No se encontraro ninguna reserva' });
    }

    Bookings.splice(bookingIndex, 1)

    return res.json({
        msg: "Reserva eliminada con exito",
    });
}