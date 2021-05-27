export class Factura {
    constructor(
    public factura:[{
         _id: String,
         idHabitacion: String,
         checkIn: Date,
         checkOut: Date,
         precio: Number,
         noches: Number,
         servicios:[{
            nombre: String,
            precio: Number,
            cantidad: Number,
            idServicio: String
        }],
         usuario:String,
         nombrePersona:String,
         apellidoPersona: String,
         correoPersona: String,
         telefonoPersona: String,
         nombreTarjeta:String,
         numeroTarjeta:String,
         exp: String,
         cvv: String,
         fecha: Date,
         total: Number}],
    public usuarioId: String
    ){}
}