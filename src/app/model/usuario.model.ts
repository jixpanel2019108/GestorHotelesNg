export class Usuario {
    constructor(
        public _id: String,
        public usuario: String,
        public correo: String,
        public password: String,
        public rol: String,
        public nombre: String,
        public apellido: String,
        public nacimiento: String,
        public direccion: String,
        public pais: String,
        public ciudad: String,
        public imagen: String,
        public hotel: String,
    ){}
}