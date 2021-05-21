export class Habitacion{
    constructor(
        public _id: String,
        public tipo: String,
        public nombre: String,
        public precio: String,
        public estado: String,
        public diasReservados:[{checkIn: Date, checkOut: Date}],
        public hotel: String
    ){}
}