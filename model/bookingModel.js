class Booking {
    constructor(id, hotel, room, numGuets, roomCategory, entryDate, egressDate, guestName, guestEmail, guestPhone, paymentStatus, timeStamp) {
        this.id = id;
        this.hotel = hotel;
        this.room = room;
        this.numGuets = numGuets;
        this.roomCategory = roomCategory;
        this.entryDate = entryDate;
        this.egressDate = egressDate;
        this.guestName = guestName;
        this.guestEmail = guestEmail;
        this.guestPhone = guestPhone;
        this.paymentStatus = paymentStatus;
        this.timeStamp = timeStamp;
    }
}

module.exports = Booking;