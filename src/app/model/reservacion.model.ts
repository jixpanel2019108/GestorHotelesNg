export class Reservacion {
    constructor(
        public _id: String,
        public idHabitacion: String,
        public checkIn: Date,
        public checkOut: Date,
        public precio: Number,
        public noches: Number,
        public servicios:[{
            nombre: String,
            precio: Number,
            cantidad: Number,
            idServicio: String
        }],
        public usuario:String,
        public nombrePersona:String,
        public apellidoPersona: String,
        public correoPersona: String,
        public telefonoPersona: String,
        public nombreTarjeta:String,
        public numeroTarjeta:String,
        public exp: String,
        public cvv: String,
        public fecha: Date,
        public total: Number
    ){}
}