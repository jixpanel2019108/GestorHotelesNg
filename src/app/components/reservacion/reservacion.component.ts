import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Habitacion } from 'src/app/model/habitacion.model';
import { Reservacion } from 'src/app/model/reservacion.model';
import { HabitacionService } from 'src/app/services/habitacion.service';
import { ReservacionService } from 'src/app/services/reservacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-reservacion',
  templateUrl: './reservacion.component.html',
  styleUrls: ['./reservacion.component.scss'],
  providers: [UsuarioService, ReservacionService, HabitacionService]
})
export class ReservacionComponent implements OnInit {
  public token
  public idHabitacion
  public reservacionModelAdd: Reservacion
  public habitacionModelGet: Habitacion

  constructor(private _usuarioService: UsuarioService, private _reservacionService: ReservacionService, private _habitacionService: HabitacionService,
    private _activatedRoute: ActivatedRoute ) { 
    this.token = _usuarioService.getToken()

    this.reservacionModelAdd = new Reservacion('','',new Date(),new Date(),0,0,[{nombre:'',cantidad:0,idServicio:''}],
    '','','','','','','','','',new Date(),0)
    this.habitacionModelGet = new Habitacion('','','','','',[{checkIn:new Date(),checkOut:new Date()}],'')

  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(dataRuta =>{
      this.idHabitacion = dataRuta.get('idHabitacion');
    })
    this.obtenerHabitacionId();
  }

  reservarHabitacion(idHabitacion){
    this._reservacionService.reservarHabitacion(this.reservacionModelAdd,this.idHabitacion,this.token).subscribe(
      response => {
        console.log(response);
      }
    )
  }

  obtenerHabitacionId(){
    this._habitacionService.obtenerHabitacionId(this.idHabitacion,this.token).subscribe(
      response => {
        console.log(response);
        this.habitacionModelGet = response.habitacionEncontrada
      }
    )
  }

}
