import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Habitacion } from 'src/app/model/habitacion.model';
import { Reservacion } from 'src/app/model/reservacion.model';
import { Servicio } from 'src/app/model/servicio.model';
import { HabitacionService } from 'src/app/services/habitacion.service';
import { ReservacionService } from 'src/app/services/reservacion.service';
import { ServicioService } from 'src/app/services/servicio.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
import { Hotel } from 'src/app/model/hotel.model';
pdfMake.vfs = pdfFonts.pdfMake.vfs


@Component({
  selector: 'app-reservacion',
  templateUrl: './reservacion.component.html',
  styleUrls: ['./reservacion.component.scss'],
  providers: [UsuarioService, ReservacionService, HabitacionService, ServicioService]
})
export class ReservacionComponent implements OnInit {
  public token
  public idHabitacion
  public reservacionModelAdd: Reservacion
  public reservacionModelGet: Reservacion
  public habitacionModelGet: Habitacion
  public servicioModelGet: Servicio
  public idServicio
  public serviciosReservacion
  public reservacionActualizadaGet: Reservacion
  public facturaGet: Reservacion
  public hotelModelGet: Hotel
  public identidad
  public arrayServicios: []
  public objetoServicios: {}
  public content:[{ text, fontSize,alignment }]

  constructor(private _usuarioService: UsuarioService, private _reservacionService: ReservacionService, private _habitacionService: HabitacionService,
    private _servicioService: ServicioService, private _activatedRoute: ActivatedRoute ) { 
    this.token = _usuarioService.getToken()
    this.identidad = this._usuarioService.getIdentidad();
    this.reservacionModelAdd = new Reservacion('','',new Date(),new Date(),0,0,[{nombre:'',precio:0,cantidad:0,idServicio:''}],
    '','','','','','','','','',new Date(),0)
    this.facturaGet = new Reservacion('','',new Date(),new Date(),0,0,[{nombre:'',precio:0,cantidad:0,idServicio:''}],
    '','','','','','','','','',new Date(),0)
    this.reservacionModelGet = new Reservacion('','',new Date(),new Date(),0,0,[{nombre:'',precio:0,cantidad:0,idServicio:''}],
    '','','','','','','','','',new Date(),0)
    this.habitacionModelGet = new Habitacion('','','','','',[{checkIn:new Date(),checkOut:new Date()}],'')
    this.servicioModelGet = new Servicio('','','',0,'','')
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(dataRuta =>{
      this.idHabitacion = dataRuta.get('idHabitacion');
    })
    this.obtenerHabitacionId();
    // this.obtenerServiciosHotel()
    this.obtenerServiciosReservacion()
    this.agregarPrecio()
    this.actualizarTotal()
    this.obtenerHotelHabitacion()
  }

  reservarHabitacion(idHabitacion){
    this._reservacionService.reservarHabitacion(this.reservacionModelAdd,this.idHabitacion,this.token).subscribe(
      response => {
        console.log(response);
        this.facturaGet = response.reservacionActualizada
        this.agregarFactura()
      },
      error => {
        Swal.fire(
          'No pueden haber campos vacios',
          'Llene todos los campos para reservar',
          'error'
        )
      }
    )
  }

  obtenerHabitacionId(){
    this._habitacionService.obtenerHabitacionId(this.idHabitacion,this.token).subscribe(
      response => {
        console.log(response);
        this.habitacionModelGet = response.habitacionEncontrada
        
        this._servicioService.obtenerServiciosHotel(this.habitacionModelGet.hotel,this.token).subscribe(
            respuesta => {
            console.log(respuesta.serviciosEncontrados);
            this.servicioModelGet = respuesta.serviciosEncontrados
            this.arrayServicios = respuesta.serviciosEncontrados
            
          }
        )

      }
    )
  }

  agregarServiciosReservacion(idServicio){
    this._reservacionService.agregarServiciosReservacion(idServicio,this.token).subscribe(
      response=> {
        console.log(response);
        this.obtenerServiciosReservacion()
        this.actualizarTotal()
      }
    )
  }

  obtenerServiciosReservacion(){
    this._reservacionService.obtenerServiciosReservacion(this.token).subscribe(
      response=>{
        console.log(response.reservacionEncontrada);
        this.reservacionModelGet = response.reservacionEncontrada
        this.serviciosReservacion = response.reservacionEncontrada.servicios
        this.actualizarTotal()
      }
    )
  }

  eliminarServicioReservacion(idServicio){
    this._reservacionService.eliminarServicioReservacion(idServicio,this.token).subscribe(
      response => {
        console.log(response);
        this.obtenerServiciosReservacion()
        this.actualizarTotal()
      }
    )
  }

  actualizarTotal(){
    this._reservacionService.actualizarTotal(this.token).subscribe(
      response => {
        console.log(response);
        this.reservacionModelGet = response.reservacionTotalActualizada
      }
    )
  }

  agregarPrecio(){
    this._reservacionService.agregarPrecio(this.idHabitacion,this.token).subscribe(
      response => {
        console.log(response);
      }
    )
  }

  agregarFactura(){
    this._reservacionService.agregarFactura(this.token).subscribe(
      response => {
        console.log('agregarFactura'+ response);
      }
    )
  }

  obtenerHotelHabitacion(){
    this._reservacionService.obtenerHotelHabitacion(this.idHabitacion, this.token).subscribe(
      response=>{
        console.log('obtenerHotelHabitacion');
        console.log(response.hotelEncontrado);
        this.hotelModelGet = response.hotelEncontrado
      }
    )
  }

  // openFreeStyle(){
  //   const documentDefinition = {
  //     content:[
  //       'Texto libre',

  //       {text:'Texto personalizado', fontSize:30, alignment: 'right', bold:true}
  //     ]
  //   };
  //   pdfMake.createPdf(documentDefinition).open();
  // }

  

  openPdfStyle() {

    
    this.arrayServicios.forEach(function callback(element, index){
      console.log(element);
    })
    
    const documentDefinition = {
      content: [
        { text: 'Hotel ' +this.hotelModelGet.nombre , fontSize: 30,alignment: 'center',decoration:'underline' },
        { text: '-----------------------------------------------------------------------------------------------------------------------------------------------------------', fontSize: 12,alignment: 'center' },
        { text: this.reservacionModelGet.fecha, fontSize: 12,alignment: 'right' },
        { text: 'Pais:', fontSize: 15,alignment: 'left' },
        { text: this.hotelModelGet.pais, fontSize: 12,alignment: 'left'},
        { text: '         ', fontSize: 15,alignment: 'left' },
        { text: 'Ciudad:', fontSize: 15,alignment: 'left' },
        { text: this.hotelModelGet.ciudad, fontSize: 12,alignment: 'left'},
        { text: '         ', fontSize: 15,alignment: 'left' },

        { text: 'Reservador:', fontSize: 15,alignment: 'left' },
        { text: this.identidad.usuario, fontSize: 12,alignment: 'left'},
        { text: '         ', fontSize: 15,alignment: 'left' },
        { text: this.reservacionModelGet.nombrePersona, fontSize: 12,alignment: 'left' },
        { text: 'Check In:', fontSize: 15,alignment: 'left' },
        { text: this.reservacionModelGet.checkIn, fontSize: 12,alignment: 'left' },
        { text: '         ', fontSize: 15,alignment: 'left' },
        { text: 'Check Out:', fontSize: 15,alignment: 'left' },
        { text: this.reservacionModelGet.checkOut, fontSize: 12,alignment: 'left' },
        { text: '         ', fontSize: 15,alignment: 'left' },

        { text: 'Habitacion:', fontSize: 15,alignment: 'left' },
        { text: this.habitacionModelGet.precio, fontSize: 12,alignment: 'left' },
        { text: '         ', fontSize: 15,alignment: 'left' },

        { text: 'Noches:', fontSize: 15,alignment: 'left' },
        { text: this.reservacionModelGet.noches, fontSize: 12,alignment: 'left' },
        { text: '         ', fontSize: 15,alignment: 'left' },
        { text: '-----------------------------------------------------------------------------------------------------------------------------------------------------------', fontSize: 12,alignment: 'center' },
        
        { text: 'Total:', fontSize: 15,alignment: 'left' },
        { text: this.reservacionModelGet.total, fontSize: 12,alignment: 'left' }

      ]
    };
  
    pdfMake.createPdf(documentDefinition).open();
  }

  
}
