import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../../model/usuario.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  providers: [UsuarioService]
})
export class RegistroComponent implements OnInit {

  public usuarioModelAdd: Usuario
  constructor(private _usuarioService: UsuarioService) {
    this.usuarioModelAdd = new Usuario("","","","","","","","","","","","","")
   }

  ngOnInit(): void {
    this.obtenerUsuarios()
  }

  obtenerUsuarios(){
    this._usuarioService.obtenerUsuarios().subscribe(
      response => {
        console.log(response.usuariosEncontrados);
        // this.usuarioModelAdd = response.usuariosEncontrados
      },
      error => {
        console.log(<any>error);
        
      }
    )
  }

  registrarUsuario(){
    this._usuarioService.registro(this.usuarioModelAdd).subscribe(
      response => {
        console.log(response);
        
      },
      err => {
        console.log(<any>err);
        
      }
    )
  }
}
