class Booking {
    constructor(id, hotel, room, roomCategory, guestName, guestEmail, guestPhone, bookingState, timeStamp) {
        this.id = id;
        this.hotel = hotel;
        this.room = room;
        this.roomCategory = roomCategory;
        this.entryDate = entryDate;
        this.egressDate = egressDate;
        this.guestName = guestName;
        this.guestEmail = guestEmail;
        this.guestPhone = guestPhone;
        this.bookingState = bookingState;
        this.timeStamp = timeStamp;
    }
}

module.exports = Booking;